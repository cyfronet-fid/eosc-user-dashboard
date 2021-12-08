import json
import tempfile
import urllib.request
from functools import lru_cache, cached_property
from urllib.parse import urlparse

from cryptojwt.key_jar import init_key_jar, KeyJar
from oidcrp.rp_handler import RPHandler

from app.core.config import OIDC_CONFIG, OIDC_JWT_ENCRYPT_CONFIG


class RpHandlerService:
    _handler = None

    @property
    def handler(self):
        if not RpHandlerService._handler:
            RpHandlerService._handler = RPHandler(
                base_url=OIDC_CONFIG['base_url'],
                client_configs=OIDC_CONFIG['clients'],
                services=OIDC_CONFIG['services'],
                keyjar=RpHandlerService._get_key_jar(OIDC_JWT_ENCRYPT_CONFIG),
                httpc_params=OIDC_CONFIG['httpc_params']
            )
        return RpHandlerService._handler

    @staticmethod
    def _get_key_jar(config):
        if not config:
            return KeyJar()

        parsed_public_path = urlparse(config['public_path'])
        is_public_key_file = not parsed_public_path.scheme
        if is_public_key_file:
            key_jar = init_key_jar(**config)
            return key_jar

        key_jar = KeyJar()
        temp = tempfile.NamedTemporaryFile(suffix=".json")
        try:
            RpHandlerService._write_jwks_to(config['public_path'], temp)
            new_config = dict(
                public_path=temp.name,
                key_defs=config['key_defs'],
                issuer_id=config['issuer_id'],
                read_only=config['read_only']
            )
            key_jar = init_key_jar(**new_config)
        finally:
            temp.close()

        return key_jar

    @staticmethod
    def _write_jwks_to(url, jwks_tempfile):
        with urllib.request.urlopen(url) as url:
            public_key_jwks = json.loads(url.read().decode())
            jwks = json.dumps(public_key_jwks, indent=2).encode('utf-8')
            jwks_tempfile.write(jwks)
            jwks_tempfile.seek(0)
