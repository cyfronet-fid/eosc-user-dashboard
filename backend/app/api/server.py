from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core import tasks
from app.core.config import API_PREFIX, PROJECT_NAME, VERSION
from app.routes import router


def get_application():
    app = FastAPI(title=PROJECT_NAME, version=VERSION)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_event_handler("startup", tasks.create_start_app_handler(app))
    app.add_event_handler("shutdown", tasks.create_stop_app_handler(app))

    app.include_router(router, prefix=API_PREFIX)

    return app


app = get_application()
