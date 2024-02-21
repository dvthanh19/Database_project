import { Typography } from "@mui/material";
import Layout from "../../components/Layout";

import { Box, } from "@mui/material";

const image = "https://c1.wallpaperflare.com/preview/702/661/129/fabric-rolls-colours-textile.jpg"

export default function Home() {
  return (
    <Layout>
      <Typography variant="h1">Fabric Agency</Typography>
      <Box sx={{ width: 200, height: 200, border: "1px solid black" }}>
        <img src={image} alt="Image" style={{ width: 600, height: 600 }} />
      </Box>
    </Layout>
  );
}
