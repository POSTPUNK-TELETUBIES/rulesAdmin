import { Type } from "../../types/supabase";

export const filterConfig = [
  { value: "all", label: "Todos" },
  ...Object.values(Type).map((value) => ({ value, label: value })),
];
