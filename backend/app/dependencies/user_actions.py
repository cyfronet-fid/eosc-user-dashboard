import datetime
import json
import logging
from typing import Optional, Union

import stomp
from stomp.exception import ConnectFailedException

from app.config import (
    STOMP_HOST,
    STOMP_LOGIN,
    STOMP_PASS,
    STOMP_PORT,
    STOMP_SSL,
    STOMP_USER_ACTIONS_TOPIC,
)
from app.schemas.web.session_data import SessionData

logger = logging.getLogger(__name__)


class UserActionClient:
    # pylint: disable=too-many-arguments
    def __init__(
        self, host: str, port: int, username: str, password: str, topic: str, ssl: bool
    ):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.topic = topic
        self.ssl = ssl
        hosts_and_ports = [(self.host, self.port)]
        self.client = stomp.Connection(host_and_ports=hosts_and_ports)
        if self.ssl:
            self.client.set_ssl(hosts_and_ports)

    def connect(self) -> None:
        self.client.connect(self.username, self.password, wait=True)

    # pylint: disable=too-many-arguments
    def send(
        self,
        session: SessionData,
        reason: list[str],
        suggestion: str,
        action: str,
        visit_id: str,
        resource_id: Union[str, int],
        resource_type: str,
    ) -> None:
        # this hack is required for legacy purposes.
        message = json.dumps(
            self._make_user_action(
                session.aai_state,
                session.session_uuid,
                reason,
                suggestion,
                action,
                visit_id,
                resource_id,
                resource_type,
            )
        )

        self.client.send(
            self.topic,
            message,
            content_type="application/json",
        )

    # pylint: disable=too-many-arguments
    def _make_user_action(
        self,
        aai_uid: Optional[str],
        session_uuid: str,
        reason: list[str],
        suggestion: str,
        action: str,
        visit_id: str,
        resource_id: Union[str, int],
        resource_type: str,
    ) -> dict:
        user_action = {
            "unique_id": session_uuid,
            "client_id": "user_dashboard",
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "source": {
                "action": action,
                "reason": reason,
                "suggestion": suggestion,
                "session_uuid": session_uuid,
                "visit_id": visit_id,
                "resource_id": resource_id,
                "resource_type": resource_type,
            },
            "target": {"visit_id": visit_id},
            "action": {"type": "recommendation evaluation"},
        }

        if aai_uid:
            user_action["aai_uid"] = aai_uid

        return user_action


def user_actions_client() -> UserActionClient | None:
    client = UserActionClient(
        STOMP_HOST,
        STOMP_PORT,
        STOMP_LOGIN,
        STOMP_PASS,
        STOMP_USER_ACTIONS_TOPIC,
        STOMP_SSL,
    )
    try:
        client.connect()
        return client
    except ConnectFailedException:
        logger.exception("Could not instantiate mqtt client")
        return None


# pylint: disable=too-many-arguments
def send_user_action_bg_task(
    client: UserActionClient,
    session: SessionData,
    reason: list[str],
    suggestion: str,
    action: str,
    visit_id: str,
    resource_id: Union[str, int],
    resource_type: str,
):
    client.send(
        session, reason, suggestion, action, visit_id, resource_id, resource_type
    )
