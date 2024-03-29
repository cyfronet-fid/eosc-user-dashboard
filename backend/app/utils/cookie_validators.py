"""
    Cookie Session Guards responsible for fetching session data if exist,
    or throwing unauthorized error if session token doesn't exist.

    For more information's see:
    https://jordanisaacs.github.io/fastapi-sessions/guide/getting_started/
"""

from uuid import UUID

from fastapi import HTTPException
from fastapi_sessions.backends.implementations import InMemoryBackend
from fastapi_sessions.frontends.implementations import CookieParameters, SessionCookie
from fastapi_sessions.session_verifier import SessionVerifier
from starlette import status

from app.config import AUTH_COOKIES_CONFIG
from app.schemas.web.session_data import SessionData


class BasicVerifier(SessionVerifier[UUID, SessionData]):
    def __init__(
        self,
        *,
        identifier: str,
        auto_error: bool,
        in_memory_backend: InMemoryBackend[UUID, SessionData],
        auth_http_exception: HTTPException,
    ):
        self._identifier = identifier
        self._auto_error = auto_error
        self._backend = in_memory_backend
        self._auth_http_exception = auth_http_exception

    @property
    def identifier(self):
        return self._identifier

    @property
    def backend(self):
        return self._backend

    @property
    def auto_error(self):
        return self._auto_error

    @property
    def auth_http_exception(self):
        return self._auth_http_exception

    def verify_session(self, model: SessionData) -> bool:
        """If the session exists, it is valid"""
        return True


cookie = SessionCookie(
    cookie_name=AUTH_COOKIES_CONFIG["cookie_name"],
    identifier=AUTH_COOKIES_CONFIG["identifier"],
    secret_key=AUTH_COOKIES_CONFIG["secret_key"],
    auto_error=AUTH_COOKIES_CONFIG["auto_error"],
    cookie_params=CookieParameters(**AUTH_COOKIES_CONFIG),
)
backend = InMemoryBackend[UUID, SessionData]()
verifier = BasicVerifier(
    identifier=AUTH_COOKIES_CONFIG["identifier"],
    auto_error=AUTH_COOKIES_CONFIG["auto_error"],
    in_memory_backend=backend,
    auth_http_exception=HTTPException(
        status_code=status.HTTP_403_FORBIDDEN, detail="Invalid session"
    ),
)
