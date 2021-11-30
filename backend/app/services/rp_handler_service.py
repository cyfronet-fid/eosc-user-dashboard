import logging

from oidcrp.rp_handler import RPHandler

from cryptojwt import KeyJar
from cryptojwt.key_jar import init_key_jar

from app.core.config import OIDC_CONFIG


class RpHandlerService:
    _handler = None

    @property
    def handler(self):
        if not RpHandlerService._handler:
            RpHandlerService._handler = RPHandler(
                base_url=OIDC_CONFIG['base_url'],
                client_configs=OIDC_CONFIG['clients'],
                services=OIDC_CONFIG['services'],
                keyjar=RpHandlerService._get_key_jar(),
                jwks_path=RpHandlerService._get_jwks_path(),
                httpc_params=OIDC_CONFIG['httpc_params']
            )

        return RpHandlerService._handler

    @staticmethod
    def _get_init_oidc_rp_handler():
        pass

    @staticmethod
    def _get_jwks_path():
        return ''
        # try:
        #     return re.sub('^(.)/', '', OIDC_CONFIG['rp_keys']['url'][OIDC_CLIENT_ID])
        # except KeyError:
        #     return ''

    @staticmethod
    def _get_key_jar():
        key_jar = KeyJar()
        key_jar.httpc_params = OIDC_CONFIG['httpc_params']
        # key_jar.public_path = RpHandlerService._get_jwks_path()
        # key_jar.read_only = True

        return key_jar
        # return init_key_jar(**OIDC_CONFIG['rp_keys']) if OIDC_CONFIG['rp_keys'] else KeyJar()
