import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MenuItem from "@mui/material/MenuItem";

export function ChapterPage() {
  return (
    <Box>
      <Container>
        <Stack direction="column" my={2} spacing={2}>
          <Stack direction="column" spacing={1} alignItems="center">
            <Typography variant="h4" fontWeight="bold">
              Solo Leveling
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="home"
                size="medium"
                sx={{
                  backgroundColor: "background.paper",
                  color: "secondary.contrastText",
                }}
              >
                <HomeIcon />
              </IconButton>
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
                  value={1}
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" startIcon={<ArrowRightIcon />}>
                Next
              </Button>
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                sx={{
                  color: "secondary.contrastText",
                  backgroundColor: "background.paper",
                }}
              ></Button>
            </Stack>
            <Typography variant="body2">
              Why is this dream still continuing? Seal, once again,
            </Typography>
            <Typography variant="body2">
              He saw the same breathtaking buildings built on top of the
              clouds. Even though yesterday was the last day for The World of
              Etomity this place still lived on But it wasn't like everything
              was the same as yesterday. There was clearly something
              different... Where..is everyone?
            </Typography>
            <Typography variant="body2">
              He saw the same breathtaking buildings built on top of the
              clouds. Even though yesterday was the last day for The World of
              Etomity this place still lived on But it wasn't like everything
              was the same as yesterday. There was clearly something
              different... Where..is everyone?
            </Typography>
            <Typography variant="body2">
              He saw the same breathtaking buildings built on top of the
              clouds. Even though yesterday was the last day for The World of
              Etomity this place still lived on But it wasn't like everything
              was the same as yesterday. There was clearly something
              different... Where..is everyone?
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
