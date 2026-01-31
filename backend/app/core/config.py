# import os
# from dotenv import load_dotenv
# from urllib.parse import quote_plus

# load_dotenv()

# class Settings:
#     PROJECT_NAME: str = "HRMS Lite"
#     MYSQL_USER: str = os.getenv("MYSQL_USER", "root")
#     MYSQL_PASSWORD: str = os.getenv("MYSQL_PASSWORD", "")
#     MYSQL_HOST: str = os.getenv("MYSQL_HOST", "localhost")
#     MYSQL_PORT: str = os.getenv("MYSQL_PORT", "3306")
#     MYSQL_DB: str = os.getenv("MYSQL_DB", "hrms_lite")
    
#     @property
#     def SQLALCHEMY_DATABASE_URL(self) -> str:
#         encoded_password = quote_plus(self.MYSQL_PASSWORD)
#         return f"mysql+pymysql://{self.MYSQL_USER}:{encoded_password}@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DB}"

# settings = Settings()

import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "HRMS Lite"
    MYSQL_URL: str = os.getenv("MYSQL_URL")

    if not DATABASE_URL:
        raise RuntimeError("MYSQL_URL is not set")

settings = Settings()

