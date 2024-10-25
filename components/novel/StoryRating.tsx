import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Box, Typography, Rating } from "@mui/material";
import { RatingPayload } from "@/models/story";
import { storyApi } from "@/api-client";

type StoryRatingCookie = {
  storyId: string;
  ratingNumber: number;
};

const StoryRating = ({ storyId }: { storyId: string }) => {
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const cookieData = Cookies.get("beststoryon_rating");
    if (cookieData) {
      const ratings = JSON.parse(cookieData);
      const rating = ratings.find(
        (r: StoryRatingCookie) => r.storyId === storyId
      );
      if (rating) setUserRating(rating.ratingNumber);
    }
  }, [storyId]);

  const handleRating = async (ratingNumber: number) => {
    const cookieData = Cookies.get("beststoryon_rating");
    let ratings: StoryRatingCookie[] = cookieData ? JSON.parse(cookieData) : [];

    const existingRating = ratings.find((rating) => rating.storyId === storyId);
    if (existingRating) {
      existingRating.ratingNumber = ratingNumber;
    } else {
      ratings.push({ storyId, ratingNumber });
    }

    Cookies.set("beststoryon_rating", JSON.stringify(ratings), {
      expires: 365,
    });
    setUserRating(ratingNumber);

    const payload: RatingPayload = { storyId, ratingNumber };
    try {
      await storyApi.ratingStory(payload);
    } catch (error) {
      console.error("Failed to vote story", error);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography
        variant="body2"
        color="text.primary"
        fontSize="medium"
        fontWeight="bold"
        sx={{ mr: 1 }}
      >
        Rating:
      </Typography>
      <Rating
        value={userRating}
        precision={0.5}
        onChange={(event, newValue) => {
          if (newValue) handleRating(newValue);
        }}
        sx={{ color: "gold" }}
      />
      {userRating && (
        <Typography
          variant="body2"
          color="text.secondary"
          fontSize="medium"
          sx={{ ml: 1 }}
        >
          {userRating}
        </Typography>
      )}
    </Box>
  );
};

export default StoryRating;
