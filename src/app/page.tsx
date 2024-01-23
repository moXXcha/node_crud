"use client";

import React, { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Tables } from "@/types/supabase";
import Link from "next/link";

const page = () => {
  const [allData, setAllData] = useState<Tables<"todo">[] | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const supabase = createClient();

  const fetchAllData = async () => {
    let { data: todo, error } = await supabase.from("todo").select("*");
    setAllData(todo);
    if (error) {
      console.log(error);
    }
  };
  const deleteData = async (id: number) => {
    const { error } = await supabase.from("todo").delete().eq("id", id);
    window.location.reload();
    console.log(error);
  };
  const insertData = async (value: string) => {
    const { error } = await supabase.from("todo").insert([{ todo: value }]);
    console.log(error);
    window.location.reload();
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <div>
      <input
        type="text"
        className="border"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          insertData(inputValue);
        }}
      >
        送信
      </button>
      {allData?.map((data, index) => (
        <div key={index} className="flex">
          {data.todo}
          {/* {data.is_done ? <div>a</div> : <div>b</div>} */}
          <button
            onClick={() => {
              deleteData(data.id);
            }}
          >
            削除
          </button>
          <Link href={`/${data.id}`}>編集</Link>
        </div>
      ))}
    </div>
  );
};

export default page;
