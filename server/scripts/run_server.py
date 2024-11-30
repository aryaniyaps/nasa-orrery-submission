import uvicorn
from app.logger import build_server_log_config, setup_logging
from app.settings import (
    CoreSettings,
    LoggingSettings,
    ServerSettings,
    get_settings,
)

if __name__ == "__main__":
    core_settings = get_settings(CoreSettings)
    server_settings = get_settings(ServerSettings)
    # set up logging
    setup_logging(
        human_readable=core_settings.debug,
    )

    # run application
    uvicorn.run(
        app="app:create_app",
        factory=True,
        host=server_settings.host,
        port=server_settings.port,
        server_header=False,
        date_header=False,
        reload=core_settings.debug,
        access_log=core_settings.debug,
        log_config=build_server_log_config(
            log_level=get_settings(LoggingSettings).level,
            human_readable=core_settings.debug,
        ),
    )