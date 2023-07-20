import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  type: number;
};

export default function SortingImage(props: Props) {
  //console.log("mounted, Sorting Image props:", props);

  const [imgPath, setImgPath] = useState("");
  const [type, setType] = useState(props.type);

  useEffect(() => {
    switch (type) {
      case 0:
        setImgPath("/noSort.svg");
        break;
      case 1:
        setImgPath("/ascendingSort.svg");
        break;

      case 2:
        setImgPath("/descendingSort.svg");
        break;
    }
  }, []);

  return (
    <Image
      src={imgPath}
      width={20}
      height={20}
      alt={imgPath}
      priority={true}
      className="ml-2"
    />
  );
}
