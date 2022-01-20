from databases import DatabaseURL
from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")
PROJECT_NAME = "EOSC Profile Service"
VERSION = "0.0.1"
API_PREFIX = "/api/v1"
SECRET_KEY = config("SECRET_KEY", cast=Secret, default="CHANGEME")
POSTGRES_USER = config("POSTGRES_USER", cast=str)
POSTGRES_PASSWORD = config("POSTGRES_PASSWORD", cast=Secret)
POSTGRES_SERVER = config("POSTGRES_SERVER", cast=str, default="db")
POSTGRES_PORT = config("POSTGRES_PORT", cast=str, default="5432")
POSTGRES_DB = config("POSTGRES_DB", cast=str)
DATABASE_URL = config(
    "DATABASE_URL",
    cast=DatabaseURL,
    default=f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
)

UI_DOMAIN = config("UI_DOMAIN", cast=str, default="http://localhost:4200")
DOMAIN = config("DOMAIN", cast=str, default='localhost')
DOMAIN_PORT = config("DOMAIN_PORT", cast=int, default=8000)
HOST = config("OIDC_HOST", cast=str, default=f'http://{DOMAIN}{f":{DOMAIN_PORT}" if DOMAIN_PORT else ""}')
OIDC_HOST = config("OIDC_HOST", cast=str, default="aai-demo.eosc-portal.eu")
OIDC_ISSUER = config("OIDC_ISSUER", cast=str, default=f'https://{OIDC_HOST}/oidc/')
OIDC_CLIENT_ID = config("OIDC_CLIENT_ID", cast=str)
OIDC_CLIENT_SECRET = config("OIDC_CLIENT_SECRET", cast=str)

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
        authorization_endpoint=f"https://{OIDC_HOST}/oidc/authorize",
        token_endpoint=f"https://{OIDC_HOST}/oidc/token",
        userinfo_endpoint=f"https://{OIDC_HOST}/oidc/userinfo",
    ),
    redirect_uris=[f'{HOST}/api/v1/auth/checkin'],
    post_logout_redirect_uri=f"{HOST}/auth/logout",
    backchannel_logout_uri=f"{HOST}/auth/logout",
    backchannel_logout_session_required=True,
)
OIDC_CONFIG = dict(
    port=DOMAIN_PORT,
    domain=DOMAIN,
    base_url=HOST,
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
    public_path=f"https://{OIDC_HOST}/oidc/jwk",
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