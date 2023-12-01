import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { onValue, ref } from "firebase/database";
import { rtdb } from "@/dbConfig/firebase";

type User = {
  ["nombre(s)"]: string;
  ["apellido(s)"]: string;
  email: string;
  id: string;
  asistencia: boolean;
  sexo: string;
};

export function Overview() {
  const [userList, setUserList] = useState<Array<User>>([]);
  const [dataTable, setDataTable] = useState([
    {
      name: "Hombres",
      total: 0,
    },
    {
      name: "Mujeres",
      total: 0,
    },
  ]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const userRef = ref(rtdb, "usuarios/");
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUserList(data);
        });
      } catch (err) {
        console.error(err);
      }
    };

    getUsersData();
  }, []); // Ensure to add userList to the dependency array if you need to trigger the effect on userList changes

  useEffect(() => {
    let asistentesHombres = 0;
    let asistentesMujeres = 0;

    Object.values(userList).forEach((user: User) => {
      if (user.asistencia) {
        if (user.sexo === "masculino") {
          asistentesHombres++;
        } else {
          asistentesMujeres++;
        }
      }
    });

    setDataTable([
      {
        name: "Hombres",
        total: asistentesHombres,
      },
      {
        name: "Mujeres",
        total: asistentesMujeres,
      },
    ]);
  }, [userList]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={dataTable}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `${value}`}
          allowDecimals={false}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
