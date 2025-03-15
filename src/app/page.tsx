import Image from "next/image";
import styles from "./page.module.css";
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
