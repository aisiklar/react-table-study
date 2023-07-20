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
  const [sorting, setSorting] = useState(SortType.noSort);
  const [sortedField, setSortedField] = useState(SortedField.none);
  // number of clicks on field names for sorting
  const [click, setClick] = useState(0);

  // sortState
  const [sortState, setSortState] = useState({
    none: { sortType: SortType.noSort, click: 0 },
    id: { sortType: SortType.noSort, click: 0 },
    first_name: { sortType: SortType.noSort, click: 0 },
    last_name: { sortType: SortType.noSort, click: 0 },
    email: { sortType: SortType.noSort, click: 0 },
    gender: { sortType: SortType.noSort, click: 0 },
    dob: { sortType: SortType.noSort, click: 0 },
  });

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

  function setSortingTypeOnClick(fieldName: string) {
    console.log("clicked Field: ", fieldName);
    console.log("sortedField, SortedField.fieldName: ", SortedField[fieldName]);
    setSortState({
      ...sortState,
      `${fieldName}`: {
        ...sortState.id,
        click: (sortState[fieldName].click + 1) % 3,
      },
    });
    console.log("after click, sortState:", sortState);
    console.log("after click, sortState[fieldName]:", sortState[fieldName]);
  }

  // sorting function
  // TO DO
  function sortField(sortingType: number, sortedField: number) {
    let tempdata = [...originalData];
    console.log("unsorted tempdata: ", tempdata.slice(0, 20));
    tempdata.sort((a: DataFormat, b: DataFormat) => {
      if (a.first_name.toUpperCase() < b.first_name.toUpperCase()) {
        console.log("a.first_name.toUpperCase() < b.first_name.toUpperCase()");
        return -1;
      } else {
        return 1;
      }
    });
    console.log("tempdata", tempdata.slice(0, 20));
  }

  // for testing. erase later
  sortField(0, 0);

  //INFO LOGS
  console.log("data length: ", data.length);
  console.log("data[0].dob: ", data[0].dob);
  console.log("dataQty: ", dataQty);
  console.log("sorting:", sorting);
  console.log("click: ", click);

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
                  <SortingImage type={sortState.id.sortType} />
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("first_name")}
              >
                <div className="flex">
                  first name
                  <SortingImage type={sortState.first_name.sortType} />
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("last_name")}
              >
                <div className="flex">
                  Last Name
                  <SortingImage type={sortState.last_name.sortType} />
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("email")}
              >
                <div className="flex">
                  e-mail <SortingImage type={sortState.email.sortType} />
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("gender")}
              >
                <div className="flex">
                  Gender <SortingImage type={sortState.gender.sortType} />
                </div>
              </th>
              <th
                scope="col"
                className={styles.headerRow}
                onClick={() => setSortingTypeOnClick("dob")}
              >
                <div className="flex">
                  Birth Date
                  <SortingImage type={sortState.dob.sortType} />
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
