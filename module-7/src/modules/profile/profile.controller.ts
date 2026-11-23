import { RequestHandler } from "express";
import { profileService } from "./profile.service";

const createProfile: RequestHandler = async (req, res) => {
  try {
    const data = await profileService.createProfile(req.body);
    res.status(201).send({
      success: true,
      message: "Profile created successful!",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong!",
    });
  }
};

export const profileController = {
  createProfile,
};
