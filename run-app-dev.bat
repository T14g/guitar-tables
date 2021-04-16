@echo off
START /min /d C:\js mongodb\bin\mongod.exe --dbpath=mongodb-data
START /min cmd.exe /k "cd C:\js\guitar-tables\ && npm run server"
START /min cmd.exe /k "cd C:\js\guitar-tables\api && npm start"
START chrome http://127.0.0.1:8080/
START cmd.exe /k "code C:\js\guitar-tables\"