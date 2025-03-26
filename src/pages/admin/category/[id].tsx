import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";

const AdminDetailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Kategori"
      description="Atur Kategori yang tersedia."
      type="ADMIN">
      <DetailCategory />
    </DashboardLayout>
  )
}

export default AdminDetailCategoryPage;