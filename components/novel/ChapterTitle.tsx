import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

interface ChapterTitleProps {
  chapterNumber: string;
  title: string;
  date: string;
  onClick?: () => void;
}

export function ChapterTitle({
  chapterNumber,
  title,
  date,
  onClick,
}: ChapterTitleProps) {
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: "100%",
          mt: 2,
          cursor: onClick ? "pointer" : "default",
          "&:hover": onClick
            ? {
                backgroundColor: "action.hover", // Hiệu ứng hover nếu có onClick
              }
            : undefined,
        }}
        onClick={onClick}
      >
        {/* Phần tên chương */}
        <Stack
          direction="column"
          sx={{
            flex: 1, // Phần này chiếm tối đa chiều rộng
            maxWidth: "calc(100% - 120px)", // Trừ khoảng cho ngày cập nhật
            overflow: "hidden", // Ẩn nội dung vượt quá
          }}
        >
          <Typography variant="caption">Chapter {chapterNumber}</Typography>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              display: "-webkit-box", // Để hỗ trợ clamp
              WebkitBoxOrient: "vertical", // Định hướng dọc
              WebkitLineClamp: 3, // Hiển thị tối đa 3 dòng
              overflow: "hidden", // Ẩn phần nội dung vượt quá
              textOverflow: "ellipsis", // Thêm dấu "..." nếu bị ẩn
              whiteSpace: "normal", // Cho phép xuống dòng nếu cần
            }}
          >
            {title}
          </Typography>
        </Stack>

        {/* Phần ngày cập nhật */}
        <Typography
          variant="caption"
          fontWeight="regular"
          sx={{
            width: "120px", // Độ rộng cố định cho ngày cập nhật
            textAlign: "right", // Căn phải
            whiteSpace: "nowrap", // Không xuống dòng
            overflow: "hidden", // Ẩn nội dung nếu quá dài
            textOverflow: "ellipsis", // Thêm dấu "..."
          }}
        >
          {date.replace("update", "")}
        </Typography>
      </Stack>
    </>
  );
}
