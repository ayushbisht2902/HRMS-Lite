import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv()

class Settings:
    PROJECT_NAME: str = "HRMS Lite"
    
    @property
    def SQLALCHEMY_DATABASE_URL(self) -> str:
        database_url = os.getenv("DATABASE_URL") or os.getenv("MYSQL_URL")
        
        if database_url:
            if database_url.startswith("mysql://"):
                return database_url.replace("mysql://", "mysql+pymysql://", 1)
            return database_url
        
        MYSQL_USER = os.getenv("MYSQL_USER", "root")
        MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
        MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
        MYSQL_PORT = os.getenv("MYSQL_PORT", "3306")
        MYSQL_DB = os.getenv("MYSQL_DB", "hrms_lite")
        
        encoded_password = quote_plus(MYSQL_PASSWORD)
        return f"mysql+pymysql://{MYSQL_USER}:{encoded_password}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}"

settings = Settings()
