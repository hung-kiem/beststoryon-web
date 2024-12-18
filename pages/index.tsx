import { homeApi } from "@/api-client";
import {
  NewRelease,
  HotNovel,
  TrendingNovel,
  HotNovelMain,
} from "@/components/home";
import { MainLayout } from "@/components/layout";
import { Box } from "@mui/material";
import useSWR from "swr";
import React, { ReactNode, useEffect, useRef } from "react";
import BannerPage from "@/components/home/BannerPage";
import { Seo } from "@/components/common";
import { NextPage } from "next";

export async function getServerSideProps() {
  const dataHotTopList = await fetch(
    `${process.env.CORE_API}/api/home/getHotTopList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId: "123" }),
    }
  );

  const hotTopList = await dataHotTopList.json();

  const dataTrendingList = await fetch(
    `${process.env.CORE_API}/api/home/getTrendingList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId: "123" }),
    }
  );

  const trendingList = await dataTrendingList.json();

  const dataNewReleaseList = await fetch(
    `${process.env.CORE_API}/api/home/getNewReleaseList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId: "123" }),
    }
  );

  const newReleaseList = await dataNewReleaseList.json();

  const dataHotList = await fetch(
    `${process.env.CORE_API}/api/home/getHotList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId: "123" }),
    }
  );

  const hotList = await dataHotList.json();

  return {
    props: {
      hotTopList: hotTopList?.data || [],
      trendingList: trendingList?.data || [],
      newReleaseList: newReleaseList?.data || [],
      hotList: hotList?.data || [],
    },
  };
}

type LayoutProps = {
  children: ReactNode;
};

type HomeProps = {
  hotTopList: any[];
  trendingList: any[];
  newReleaseList: any[];
  hotList: any[];
};

const Home: NextPage<HomeProps> & { Layout?: React.FC<LayoutProps> } = ({
  hotTopList,
  trendingList,
  newReleaseList,
  hotList,
}) => {
  const { data: bannerList } = useSWR(
    ["/home/getBannerList", "HOME"],
    () =>
      homeApi.getBannerList({
        requestId: "1",
        bannerOfPage: "HOME",
      }),
    {
      dedupingInterval: 3600000,
    }
  );
  const banner1 =
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "1" || banner.bannerPos === "0"
    ) || [];
  const banner2 =
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "2" || banner.bannerPos === "0"
    ) || [];
  const banner3 =
    bannerList?.data?.filter(
      (banner) => banner.bannerPos === "3" || banner.bannerPos === "0"
    ) || [];
  const addedScripts = useRef(new Set());

  useEffect(() => {
    banner1.forEach((banner) => {
      if (banner.bannerDesc && !addedScripts.current.has(banner.bannerId)) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = banner.bannerDesc;
        const script = tempDiv.querySelector("script");

        if (script) {
          const existingScript = document.head.querySelector(
            `script[data-banner-id="${banner.bannerId}"]`
          );
          if (!existingScript) {
            const newScript = document.createElement("script");
            Array.from(script.attributes).forEach((attr) =>
              newScript.setAttribute(attr.name, attr.value)
            );
            newScript.innerHTML = script.innerHTML;

            newScript.setAttribute(
              "data-banner-id",
              banner.bannerId.toString()
            );

            document.head.appendChild(newScript);
            addedScripts.current.add(banner.bannerId);
            console.log(`Added script for bannerId: ${banner.bannerId}`);
          }
        }
      }
    });

    banner2.forEach((banner) => {
      if (banner.bannerDesc && !addedScripts.current.has(banner.bannerId)) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = banner.bannerDesc;
        const script = tempDiv.querySelector("script");

        if (script) {
          const existingScript = document.head.querySelector(
            `script[data-banner-id="${banner.bannerId}"]`
          );
          if (!existingScript) {
            const newScript = document.createElement("script");
            Array.from(script.attributes).forEach((attr) =>
              newScript.setAttribute(attr.name, attr.value)
            );
            newScript.innerHTML = script.innerHTML;

            newScript.setAttribute(
              "data-banner-id",
              banner.bannerId.toString()
            );

            document.head.appendChild(newScript);
            addedScripts.current.add(banner.bannerId);
            console.log(`Added script for bannerId: ${banner.bannerId}`);
          }
        }
      }
    });

    banner3.forEach((banner) => {
      if (banner.bannerDesc && !addedScripts.current.has(banner.bannerId)) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = banner.bannerDesc;
        const script = tempDiv.querySelector("script");

        if (script) {
          const existingScript = document.head.querySelector(
            `script[data-banner-id="${banner.bannerId}"]`
          );
          if (!existingScript) {
            const newScript = document.createElement("script");
            Array.from(script.attributes).forEach((attr) =>
              newScript.setAttribute(attr.name, attr.value)
            );
            newScript.innerHTML = script.innerHTML;

            newScript.setAttribute(
              "data-banner-id",
              banner.bannerId.toString()
            );

            document.head.appendChild(newScript);
            addedScripts.current.add(banner.bannerId);
            console.log(`Added script for bannerId: ${banner.bannerId}`);
          }
        }
      }
    });

    return () => {
      banner1.forEach((banner) => {
        const existingScript = document.head.querySelector(
          `script[data-banner-id="${banner.bannerId}"]`
        );
        if (existingScript) {
          existingScript.remove();
          addedScripts.current.delete(banner.bannerId);
          console.log(`Removed script for bannerId: ${banner.bannerId}`);
        }
      });

      banner2.forEach((banner) => {
        const existingScript = document.head.querySelector(
          `script[data-banner-id="${banner.bannerId}"]`
        );
        if (existingScript) {
          existingScript.remove();
          addedScripts.current.delete(banner.bannerId);
          console.log(`Removed script for bannerId: ${banner.bannerId}`);
        }
      });

      banner3.forEach((banner) => {
        const existingScript = document.head.querySelector(
          `script[data-banner-id="${banner.bannerId}"]`
        );
        if (existingScript) {
          existingScript.remove();
          addedScripts.current.delete(banner.bannerId);
          console.log(`Removed script for bannerId: ${banner.bannerId}`);
        }
      });
    };
  }, [banner1, banner2, banner3]);

  return (
    <Box>
      <Seo
        data={{
          url: "https://novelsnook.com/",
          title:
            "NovelsNook - Explore Fan-Fiction Novels Online – Completely Free!",
          description:
            "Dive into a world of free online novels! Discover daily-updated stories, including light novel, web novels, and a wide range of captivating genres.",
          thumbnailUrl: "https://novelsnook.com/",
        }}
      />
      {/* <LoadingOverlay isLoading={isLoading} /> */}
      {hotTopList && hotTopList?.length > 0 && (
        <HotNovelMain data={hotTopList || []} />
      )}
      {banner1?.length > 0 && <BannerPage data={banner1} />}
      {trendingList && trendingList.length > 0 && (
        <TrendingNovel data={trendingList || []} />
      )}
      {banner2?.length > 0 && <BannerPage data={banner2} />}
      {newReleaseList && newReleaseList.length > 0 && (
        <NewRelease data={newReleaseList || []} />
      )}
      {hotList && hotList.length > 0 && <HotNovel data={hotList || []} />}
      {banner3?.length > 0 && <BannerPage data={banner3} />}
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
