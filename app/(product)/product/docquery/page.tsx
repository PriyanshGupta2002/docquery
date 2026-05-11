import DocumentTable from "@/components/DocumentTable";
import Upload from "@/components/Upload";

const page = async () => {
  return (
    <div className="p-4 mt-3 space-y-3.5 max-w-5xl mx-auto w-full">
      <Upload />
      <DocumentTable />
    </div>
  );
};

export default page;
