import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import cors from 'cors';
import ConnectMongoDb from './database';

export default function appConfig(app: Application) {
  
  if (process.env.NODE_ENV !== undefined) {
    // if NODE_ENV exists will run the code below
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  }

  // default .env for production
  dotenv.config();

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.use(cookieParser());

  ConnectMongoDb();

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
}
