import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      hi
      <Link href="/fight">
        <Button>
          FIGHT
        </Button>
      </Link>
    </Box>
  );
}
