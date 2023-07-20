import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  click: number;
};

export default function SortingImage(props: Props) {
  //console.log("mounted, Sorting Image props:", props);

  const [imgPath, setImgPath] = useState("/noSort.svg");

  let click = props.click;

  /* console.log("imgPath: ", imgPath);
  console.log("click: ", click);
 */
  useEffect(() => {
    //    console.log("in useEffect");
    switch (click) {
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
  }, [props]);

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
