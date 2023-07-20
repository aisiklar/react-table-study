"use client";

import styles from "../../styles/stdTable.module.css";
import originalData from "../../data/dummyData.json";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import SortingImage from "@/components/imageComponents/sortingImage";

type DataFormat = {
  id: Number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
};

export default function Stdtable() {
  //VARIABLES, CONSTANTS, ASSIGNMENTS
  enum SortType {
    noSort,
    ascending,
    descending,
  }

  enum SortedField {
    none,
    id,
    first_name,
    last_name,
    email,
    gender,
    dob,
  }

  // STATES

  // data displayed on DOM
  const [data, setData] = useState([...originalData]);
  // veri sayısı
  const [dataQty, setDataQty] = useState(10);
  // seçilen sorting tipi
  //const [sorting, setSorting] = useState(SortType.noSort);
  const [sortedField, setSortedField] = useState(SortedField.none);

  // sortState

  const [sortStateNoSort, setSortStateNoSort] = useState([
    { field: "none", sortType: SortType.noSort, click: 0 },
    { field: "id", sortType: SortType.noSort, click: 0 },
    { field: "first_name", sortType: SortType.noSort, click: 0 },
    { field: "last_name", sortType: SortType.noSort, click: 0 },
    { field: "email", sortType: SortType.noSort, click: 0 },
    { field: "gender", sortType: SortType.noSort, click: 0 },
    { field: "dob", sortType: SortType.noSort, click: 0 },
  ]);
  const [sortState, setSortState] = useState([
    { field: "none", sortType: SortType.noSort, click: 0 },
    { field: "id", sortType: SortType.noSort, click: 0 },
    { field: "first_name", sortType: SortType.noSort, click: 0 },
    { field: "last_name", sortType: SortType.noSort, click: 0 },
    { field: "email", sortType: SortType.noSort, click: 0 },
    { field: "gender", sortType: SortType.noSort, click: 0 },
    { field: "dob", sortType: SortType.noSort, click: 0 },
  ]);

  // METHODS
  function changeValue(e: ChangeEvent<HTMLInputElement>) {
    console.log("change value e: ", e.target.value);
    let value: number = +e.target.value;
    if (value <= data.length) {
      setDataQty(value);
    } else {
      setDataQty(data.length);
    }
  }

  // takes the field from click event on the table cell
  // finds the related click propert from sortState and increases it / stores it (modulus of 3)
  function setSortingTypeOnClick(fieldName: string) {
    console.log("clicked Field: ", fieldName);
    //console.log("sortedField, SortedField.fieldName: ", SortedField[fieldName]); //1,2,3,4,...
    let index: number = SortedField[fieldName]; //0,1,2,3,4,...
    // console.log("selected sortState elem., sortState.index", sortState[index]); // {field: ...}
    let memClick = sortState[index].click;
    console.log("memClick: ", memClick);
    let tempSortState = JSON.parse(JSON.stringify(sortStateNoSort));
    tempSortState[index].click = (memClick + 1) % 3;
    console.log("tempSortState[index].click: ", tempSortState[index].click);
    setSortState([...tempSortState]);
    console.log(
      "before calling sortField(sortingtype, fieldname), sortState[index].click, fieldName: ",
      sortState[index].click,
      fieldName
    );
    sortField(tempSortState[index].click, fieldName);
  }

  // sorting function
  // TO DO
  function sortField(sortingType: number, sortedField: string) {
    let tempdata = JSON.parse(JSON.stringify(originalData));
    console.log("tempdata: ", tempdata);
    console.log(
      "in func sortField, sortingType, sortedField:",
      sortingType,
      sortedField
    );

    switch (sortingType) {
      case 0:
        // no sort
        console.log("no sort");
        setData(JSON.parse(JSON.stringify(tempdata)));
        break;
      case 1:
        // ascending sort
        console.log("sort ascending");
        ascendingSort();
        break;
      case 2:
        //descending sort
        console.log("sort descending");
        descendingSort();
        break;
    }

    function ascendingSort() {
      tempdata.sort((a: DataFormat, b: DataFormat) => {
        switch (typeof a[`${sortedField}`]) {
          case "string":
            if (
              a[`${sortedField}`].toUpperCase() <
              b[`${sortedField}`].toUpperCase()
            ) {
              return -1;
            } else {
              return 1;
            }
            break;
          case "number":
            if (a[`${sortedField}`] < b[`${sortedField}`]) {
              return -1;
            } else {
              return 1;
            }
        }
      });
      setData(JSON.parse(JSON.stringify(tempdata)));
    }

    function descendingSort() {
      tempdata.sort((a: DataFormat, b: DataFormat) => {
        switch (typeof a[`${sortedField}`]) {
          case "string":
            if (
              a[`${sortedField}`].toUpperCase() >
              b[`${sortedField}`].toUpperCase()
            ) {
              return -1;
            } else {
              return 1;
            }
            break;
          case "number":
            if (a[`${sortedField}`] > b[`${sortedField}`]) {
              return -1;
            } else {
              return 1;
            }
        }
      });
      setData(JSON.parse(JSON.stringify(tempdata)));
    }
  }

  //INFO LOGS
  //console.log("data length: ", data.length);
  console.log("originalData: ", originalData);
  //console.log("data[0].dob: ", data[0].dob);
  //console.log("dataQty: ", dataQty);
  //console.log("sorting:", sorting);
  console.log("sortState: ", sortState);
  console.log("sortStateNoSort: ", sortStateNoSort);

  return (
    <main>
      standard table!!
      <div className="m-4">
        <form className="" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="dataQty">gösterilecek veri sayısı:</label>
          <input
            className="bg-gray-400 ml-4 text-red"
            name="dataQty"
            type="text"
            onChange={changeValue}
            value={dataQty}
            placeholder="gösterilecek veri sayısını girin (varsayılan: 10)"
          ></input>
        </form>
      </div>
      <div className="border border-gray-600 rounded mt-4 ml-16">
        <table className="border border-gray-300 rounded my-4 ml-16">
          <colgroup>
            <col />
            <col span={3} className="bg-slate-500"></col>
            <col span={1} className="bg-slate-700"></col>
            <col span={1} className="bg-slate-900"></col>
          </colgroup>
          <thead>
            <tr>
              <td className="border"></td>
              <th
                colSpan={3}
                scope="col"
                className="border transition-all ease-in-out duration-300 hover:cursor-pointer hover:text-sm "
                onClick={() => console.log("userGroup1 clicked")}
              >
                userGroup1
              </th>
              <th
                colSpan={1}
                scope="col"
                className="border transition-all ease-in-out duration-300 hover:cursor-pointer hover:text-sm "
                onClick={() => console.log("userGroup2 clicked")}
              >
                userGroup2
              </th>
              <th
                colSpan={1}
                scope="col"
                className="border transition-all ease-in-out duration-300 hover:cursor-pointer hover:text-sm "
                onClick={() => console.log("userGroup3 clicked")}
              >
                userGroup3
              </th>
            </tr>
            <tr>
              <th
                scope="col"
                className={styles.headerRow_id}
                onClick={() => setSortingTypeOnClick("id")}
              >
                <div className="flex">
                  id
                  {<SortingImage click={sortState[SortedField.id].click} />}
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("first_name")}
              >
                <div className="flex">
                  first name
                  {
                    <SortingImage
                      click={sortState[SortedField.first_name].click}
                    />
                  }
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("last_name")}
              >
                <div className="flex">
                  Last Name
                  {
                    <SortingImage
                      click={sortState[SortedField.last_name].click}
                    />
                  }
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("email")}
              >
                <div className="flex">
                  e-mail
                  {<SortingImage click={sortState[SortedField.email].click} />}
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("gender")}
              >
                <div className="flex">
                  Gender
                  {<SortingImage click={sortState[SortedField.gender].click} />}
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("dob")}
              >
                <div className="flex">
                  Birth Date
                  {<SortingImage click={sortState[SortedField.dob].click} />}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.slice(0, dataQty).map((user, index) => {
              return (
                <tr key={index}>
                  <td className="styles.row">{user.id}</td>
                  <td className="styles.row">{user.first_name}</td>
                  <td className="styles.row">{user.last_name}</td>
                  <td className="styles.row">{user.email}</td>
                  <td className="styles.row">{user.gender}</td>
                  <td className="styles.row">{user.dob}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/*  <div className="mt-6">
        <table>
          <caption>Superheros and sidekicks</caption>
          <colgroup>
            <col />
            <col span={2} className={styles.batman}></col>
            <col span={2} className={styles.flash}></col>
          </colgroup>
          <tr>
            <td> </td>
            <th colSpan={2} scope="col">
              1
            </th>
            <th colSpan={2} scope="col">
              2
            </th>
          </tr>
          <tr>
            <td> </td>
            <th scope="col" onClick={() => console.log("Batman clicked")}>
              Batman
            </th>
            <th scope="col" onClick={() => console.log("Robin clicked")}>
              Robin
            </th>
            <th scope="col">The Flash</th>
            <th scope="col">Kid Flash</th>
          </tr>
          <tbody>
            <tr>
              <th scope="row">Skill</th>
              <td>Smarts</td>
              <td>Dex, acrobat</td>
              <td>Super speed</td>
              <td>Super speed</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </main>
  );
}
