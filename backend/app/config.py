import os

from databases import DatabaseURL
from starlette.config import Config
from starlette.datastructures import Secret

from urllib.parse import urlparse

config = Config(environ=os.environ)
IS_TESTING = config("TESTING", cast=bool, default=False)

PROJECT_NAME = "EOSC Profile Service"
VERSION = "0.0.1"
API_PREFIX = "/api/v1"
SECRET_KEY = config("SECRET_KEY", cast=Secret, default="CHANGEME")
DATABASE_URI = config(
    "DATABASE_URI",
    cast=str,
    default="postgresql+psycopg2://user-dashboard:user-dashboard@localhost:5432/user-dashboard"
)

DOMAIN_URL = config("DOMAIN_URL", cast=str, default="http://localhost:8000")

OIDC_HOST = config("OIDC_HOST", cast=str, default="https://aai-demo.eosc-portal.eu")
OIDC_ISSUER = config("OIDC_ISSUER", cast=str, default=f'{OIDC_HOST}/oidc/')
OIDC_CLIENT_ID = config("OIDC_CLIENT_ID", cast=str, default="<MISSING OIDC CLIENT ID>")
OIDC_CLIENT_SECRET = config("OIDC_CLIENT_SECRET", cast=str, default="<MISING OIDC CLIENT SECRET>")

OIDC_CLIENT_OPTIONS = client_options = dict(
    issuer=OIDC_ISSUER,
    client_id=OIDC_CLIENT_ID,
    client_secret=OIDC_CLIENT_SECRET,
    behaviour=dict(
        application_name="user_profile_service",
        application_type="web",
        response_types=["code"],
        scope=["openid", "profile", "email"],
        token_endpoint_auth_method=[
            "client_secret_basic",
            'client_secret_post'
        ]
    ),
    provider_info=dict(
        authorization_endpoint=f"{OIDC_HOST}/oidc/authorize",
        token_endpoint=f"{OIDC_HOST}/oidc/token",
        userinfo_endpoint=f"{OIDC_HOST}/oidc/userinfo",
    ),
    redirect_uris=[f'{DOMAIN_URL}/api/v1/auth/checkin'],
    post_logout_redirect_uri=f"{DOMAIN_URL}/auth/logout",
    backchannel_logout_uri=f"{DOMAIN_URL}/auth/logout",
    backchannel_logout_session_required=True,
)

parsedUrl = urlparse(DOMAIN_URL)
OIDC_CONFIG = dict(
    port=parsedUrl.port if parsedUrl.port else None,
    domain=f'{parsedUrl.scheme}://{parsedUrl.netloc}',
    base_url=DOMAIN_URL,
    httpc_params=dict(verify=False),
    services=dict(
        discovery={
            "class": "oidcrp.oidc.provider_info_discovery.ProviderInfoDiscovery",
            "kwargs": {}
        },
        registration={
            "class": "oidcrp.oidc.registration.Registration",
            "kwargs": {}
        },
        authorization={
            "class": "oidcrp.oidc.authorization.Authorization",
            "kwargs": {}
        },
        accesstoken={
            "class": "oidcrp.oidc.access_token.AccessToken",
            "kwargs": {}
        },
        userinfo={
            "class": "oidcrp.oidc.userinfo.UserInfo",
            "kwargs": {}
        },
        end_session={
            "class": "oidcrp.oidc.end_session.EndSession",
            "kwargs": {}
        }
    ),
)
OIDC_JWT_ENCRYPT_CONFIG = dict(
    public_path=f"{OIDC_HOST}/oidc/jwk",
    key_defs=[
      {
        "type": "RSA",
        "use": [
          "sig"
        ]
      },
    ],
    issuer_id=OIDC_ISSUER,
    read_only=True,
)
OIDC_CONFIG['clients'] = dict()
OIDC_CONFIG['clients'][OIDC_ISSUER] = OIDC_CLIENT_OPTIONS

AUTH_COOKIES_CONFIG = dict(
    max_age=24*60*60, # 1 day
    cookie_name="_mp_service_auth",
    identifier="general_verifier",
    auto_error=True,
    secure=True,
    secret_key="DONOTUSE",
)