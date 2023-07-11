import { UpdateMutationTestForm } from "@/components/UpdateMutationTestForm";
import { getSupabaseClient } from "@/lib/getSupabaseClient";

export const revalidate = 0;

const Home = async () => {
  const supabase = getSupabaseClient();

  const { data: testObjects } = await supabase.from("Testing").select();

  const sortObjects = (a: any, b: any) => {
    if (a?.id > b?.id) {
      return 1;
    } else if (a?.id < b?.id) {
      return -1;
    }

    return 0;
  };

  return (
    <>
      {testObjects?.sort(sortObjects).map((testObject) => {
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
