'use client'
import { useProfile } from '@/components/UseProfile';
import SectionHeaders from '@/components/layout/SectionHeaders'
import UserTabs from '@/components/layout/UserTabs'

export default function OrderPage() {

  const {data:profile} = useProfile();

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
        <div className="text-center mt-8">
            <SectionHeaders mainHeader={'Orders'}/>
            <div className='text-gray-600'>
              No Orders...
            </div>
        </div>
    </section>
  )
}
