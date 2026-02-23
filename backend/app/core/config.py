from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+psycopg2://jobtracker:jobtracker@localhost:5433/jobtracker"
    JWT_SECRET: str = "CHANGE_ME_TO_A_LONG_RANDOM_SECRET"
    JWT_ALG: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"


settings = Settings()