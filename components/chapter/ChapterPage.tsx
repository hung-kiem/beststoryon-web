import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useThemeContext } from "@context/theme-context";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MenuItem from "@mui/material/MenuItem";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.default",
  boxShadow: 24,
  p: 4,
};

export const ChapterPage = () => {
  const theme = useTheme();
  const [chapter, setChapter] = useState("");
  const [open, setOpen] = useState(false);
  const { mode, toggleTheme } = useThemeContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setChapter(event.target.value);
  };

  return (
    <Box>
      <Container>
        <Stack direction="column" spacing={2} alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            Solo Leveling
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              height: "56px",
              display: { xs: "block", sm: "none" },
            }}
          >
            <Button
              aria-label="home"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
                height: "56px",
                width: "56px",
              }}
            >
              <HomeIcon />
            </Button>
            <Button
              onClick={handleOpen}
              aria-label="setting"
              size="medium"
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "background.paper",
                height: "56px",
                width: "56px",
              }}
            >
              <SettingsIcon />
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              height: "56px",
            }}
          >
            <Button
              aria-label="home"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
                height: "56px",
                width: "56px",
                display: { xs: "none", sm: "block" },
              }}
            >
              <HomeIcon />
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowLeftIcon />}
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "background.paper",
              }}
            >
              Prev
            </Button>
            <FormControl
              sx={{
                width: 120,
              }}
            >
              <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chapter}
                label="Chapter"
                onChange={handleChange}
                color="primary"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        backgroundColor: theme.palette.background.default,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      },
                    },
                  },
                  MenuListProps: {
                    sx: {
                      py: 0,
                    },
                  },
                }}
              >
                <MenuItem value={1}>Chapter 1</MenuItem>
                <MenuItem value={2}>Chapter 2</MenuItem>
                <MenuItem value={3}>Chapter 3</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<ArrowRightIcon />}
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "background.paper",
              }}
            >
              Next
            </Button>
            <Button
              onClick={handleOpen}
              aria-label="setting"
              size="medium"
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "background.paper",
                display: { xs: "none", sm: "block" },
              }}
            >
              <SettingsIcon />
            </Button>
          </Stack>
          <Typography variant="body2" textAlign="left">
            Why is this dream still continuing?Seal, once again, <br />
            Why is this dream still continuing?Seal, once again, <br />
            He saw the same breathtaking buildings built on top of the clouds.
            <br />
            He saw the same breathtaking buildings built on top of the
            clouds.Even though yesterday was the last day for The World of
            Etomity this place still lived onBut it wasn't like everything was
            the same as yesterday. There was clearly something
            different...Where..is everyone?
            <br />
            He saw the same breathtaking buildings built on top of the
            clouds.Even though yesterday was the last day for The World of
            Etomity this place still lived onBut it wasn't like everything was
            the same as yesterday. There was clearly something
            different...Where..is everyone?
            <br />
            He saw the same breathtaking buildings built on top of the
            clouds.Even though yesterday was the last day for The World of
            Etomity this place still lived onBut it wasn't like everything was
            the same as yesterday. There was clearly something
            different...Where..is everyone?
            <br />
            He saw the same breathtaking buildings built on top of the
            clouds.Even though yesterday was the last day for The World of
            Etomity this place still lived onBut it wasn't like everything was
            the same as yesterday. There was clearly something
            different...Where..is everyone?
            <br />
          </Typography>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack
            direction="row"
            sx={style}
            borderRadius={2}
            justifyContent="space-between"
          >
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
              }}
            >
              <TextDecreaseIcon />
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
              }}
            >
              <TextIncreaseIcon />
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
              }}
            >
              Select font
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.paper",
                color: "secondary.contrastText",
              }}
            >
              {mode === "light" ? (
                <DarkModeIcon onClick={toggleTheme} fontSize="medium" />
              ) : (
                <LightModeIcon onClick={toggleTheme} fontSize="medium" />
              )}
            </Button>
          </Stack>
        </Modal>
      </Container>
    </Box>
  );
};
