"use client";

import { getSupabaseClient } from "@/lib/getSupabaseClient";
import { useUpdateData } from "@/lib/useUpdateData";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UpdateMutationTestFormProps {
  testObject: { id: string; name: string; anothercolumn: string | null };
}

export const UpdateMutationTestForm: React.FC<UpdateMutationTestFormProps> = ({
  testObject,
}) => {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [formObject, setFormObject] = useState<{
    name: string;
    anothercolumn: string | null;
  }>({
    name: testObject?.name,
    anothercolumn: testObject?.anothercolumn,
  });

  const { trigger: update } = useUpdateData(supabase.from("Testing"), ["id"]);

  const handleSubmit = () => {
    update(
      {
        ...testObject,
        ...formObject,
      },

      { onSuccess: () => router.refresh() }
    );
  };

  return (
    <div className="p-6">
      <span className="text-3xl font-bold">Test Form - {testObject?.name}</span>
      <div className="flex flex-col p-6 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <span>Name</span>
          <input
            name="name"
            className="w-48 p-2 border-2 border-black rounded-md"
            value={formObject?.name ?? ""}
            onChange={(e) =>
              setFormObject({ ...formObject, name: e?.target?.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <span>Another Column</span>
          <input
            name="another-column"
            className="w-48 border-2 p-2 border-black rounded-md"
            value={formObject?.anothercolumn ?? ""}
            onChange={(e) =>
              setFormObject({
                ...formObject,
                anothercolumn: e?.target?.value,
              })
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          className="self-start px-4 py-2 bg-[#417735] rounded-md text-white font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
