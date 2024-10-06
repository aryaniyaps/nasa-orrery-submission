from asgi_correlation_id import CorrelationIdMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.constants import APP_NAME
from app.core.openapi import generate_operation_id
from app.planets.routes import planet_router
from app.settings import AppSettings, CoreSettings, get_settings


def add_routes(app: FastAPI) -> None:
    """Register routes for the app."""
    app.include_router(planet_router)


def add_middleware(app: FastAPI, app_settings: AppSettings) -> None:
    """Register middleware for the app."""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=app_settings.cors_allow_origins,
        allow_credentials=True,
        allow_headers=["*"],
        allow_methods=["*"],
        expose_headers=["*"],
    )
    app.add_middleware(
        CorrelationIdMiddleware,
        header_name="X-Request-ID",
    )


def create_app() -> FastAPI:
    """Create a new application instance."""
    app_settings = get_settings(AppSettings)
    app = FastAPI(
        version="0.0.1",
        title=f"{APP_NAME} HTTP API",
        summary=f"""
        The {APP_NAME} HTTP API provides realtime data of Near-Earth Objects (NEOs).
        """,
        license_info={
            "name": "Apache 2.0",
            "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
        debug=get_settings(CoreSettings).debug,
        openapi_url=app_settings.openapi_url,
        swagger_ui_parameters={
            "syntaxHighlight.theme": "monokai",
            "displayRequestDuration": True,
        },
        generate_unique_id_function=generate_operation_id,
    )
    add_routes(app)
    add_middleware(app, app_settings)
    return app
