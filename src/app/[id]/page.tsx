"use client";
import React, { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";

const page = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const { id } = params;
  const supabase = createClient();
  const [allData, setAllData] = useState<Tables<"todo">[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const fetchData = async (id: number) => {
    let { data: todo, error } = await supabase
      .from("todo")
      .select("*")
      .eq("id", id);
    console.log(todo);
    if (todo) {
      setAllData(todo);
      setInputValue(todo[0].todo as string);
    }
  };
  const editData = async () => {
    const { error } = await supabase
      .from("todo")
      .update({ todo: inputValue })
      .eq("id", id);
    console.log(error);
    router.push("/");
  };
  useEffect(() => {
    fetchData(id);
  }, []);
  useEffect(() => {
    console.log(allData);
  }, [allData]);

  return (
    <div>
      <input
        type="text"
        defaultValue={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="border"
      />
      <button
        onClick={() => {
          editData();
        }}
      >
        編集
      </button>
    </div>
  );
};

export default page;
