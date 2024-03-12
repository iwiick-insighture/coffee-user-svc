import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { ApiResponse } from "../common/api-response.dto";
import {
  addUser,
  deleteUserById,
  getUserById,
  authenticate,
  updateUserById,
  doesUserExist,
} from "../services";
import configData from "../configs/config";
import { getPrefixedUUID } from "../utils";

export const healthHandler = (_: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).json({
    message: `coffee-user-svc is up and running on port :: ${configData.port}`,
  } as ApiResponse);
};

export const userExistsHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const data = await doesUserExist(email);
    res.status(HttpStatusCode.Ok).json({
      message: `Users Exists`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      error: err,
    } as ApiResponse);
  }
};

export const authenticateHandler = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const data = await authenticate(user);
    res.status(HttpStatusCode.Ok).json({
      message: `Users Authenticated`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      error: err,
    } as ApiResponse);
  }
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await getUserById(id);
    res.status(HttpStatusCode.Ok).json({
      message: `User found by ID :: ${id}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      error: err,
    } as ApiResponse);
  }
};

export const addUserHandler = async (req: Request, res: Response) => {
  try {
    const id = getPrefixedUUID();
    const newUser = req.body;
    const data = await addUser({ ...newUser, id });
    res.status(HttpStatusCode.Ok).json({
      message: `Added New User`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      error: err,
    } as ApiResponse);
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const udatedUser = req.body;
  try {
    const data = await updateUserById(id, udatedUser);
    res.status(HttpStatusCode.Ok).json({
      message: `Updated User :: ${id}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      error: err,
    } as ApiResponse);
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await deleteUserById(id);
    res.status(HttpStatusCode.Ok).json({
      message: `User Deleted :: ${id}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      error: err,
    } as ApiResponse);
  }
};
