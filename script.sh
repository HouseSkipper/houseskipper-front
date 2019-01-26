#!/bin/bash

cd /deploy/houseskipper-front
fkill :8000
npm start >> log.txt &