import { UpdateMutationTestForm } from "@/components/UpdateMutationTestForm";
import { getSupabaseClient } from "@/lib/getSupabaseClient";

export const revalidate = 0;

const Home = async () => {
  const supabase = getSupabaseClient();

  const { data: testObjects } = await supabase.from("Testing").select();

  return (
    <>
      {testObjects?.map((testObject) => {
        return (
          <UpdateMutationTestForm
            key={testObject?.id}
            testObject={testObject}
          />
        );
        ``;
      })}
    </>
  );
};

export default Home;
