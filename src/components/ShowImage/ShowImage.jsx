import { Button, Image } from "antd";
import React, { Fragment, useEffect, useState } from "react";

const ShowImage = ({ imgs }) => {
  const [newImg, setNewImg] = useState([]);
  useEffect(() => {
    if (imgs.length > 0) {
      setNewImg(imgs);
    } else {
      return [];
    }
  }, [imgs]);
  const handleDelete = (i) => {
    const preImg = newImg.slice(i, 1);
    setNewImg([...preImg]);
    console.log(preImg);
  };
  return (
    <section className="flex items-center justify-start gap-x-2 overflow-x-auto">
      {newImg?.length > 0 &&
        newImg.map((img, i) => {
          return (
            <div key={i} className="flex flex-col w-auto">
              <Image
                src={img}
                key={i}
                width={220}
                height={180}
                className="w-[200px] h-[150px] object-cover relative"
                lang="vi-VN"
              />
            </div>
          );
        })}
    </section>
  );
};

export default ShowImage;
