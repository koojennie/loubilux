import { useSidebar } from "@/context/SidebarContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types/type";
import Input from "../Input/Input";
import toast, { Toaster } from "react-hot-toast";
import { MdAddHomeWork } from "react-icons/md";
import { HiX } from "react-icons/hi";
import { showConfirmationAlert } from "@/components/Atoms/AlertConfirmation";

export default function AddressList() {
  const { expanded } = useSidebar();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [userShipping, setUserShipping] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [isFormInitialized, setIsFormInitialized] = useState(false);


  // option dropdown address
  const [province, setProvince] = useState<any[]>([]);
  const [city, setCity] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<string | null>(null);
  const [selectedProvinsiId, setSelectedProvinsiId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedDisctrict, setSelectedDisctrict] = useState<string | null>(null);
  const [selectedDisctrictId, setSelectedDisctrictId] = useState<string | null>(null);

  const [isLoadingProvince, setIsLoadingProvince] = useState(true);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);

  const getKodeByNama = (array: { nama: string; kode: string }[], nama: string): string | null => {
    return array.find(item => item.nama === nama)?.kode || null;
  };


  const [form, setForm] = useState({
    userId: '',
    receiverName: '',
    detail: '',
    city: '',
    district: '',
    province: '',
    postalCode: '',
    phoneNumber: ''
  });

  const fetchUser = async () => {
    try {
      const responseMe = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`,
        { withCredentials: true }
      );

      const userId = responseMe.data.user.id;
      setUserId(userId);

      try {
        const responseUser = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/userbyid/${userId}`,
          { withCredentials: true }
        );
        setUserShipping(responseUser.data.data);
      } catch (error: any) {
        console.error(`Error when fetch user detail: ${error.message}`);
      }

    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address`, {
        withCredentials: true,
      });
      setAddresses(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  // when first reload
  useEffect(() => {

    const fetchOptionvValueProvince = async () => {
      try {
        axios.get('https://api.nusakita.yuefii.site/v2/provinsi?limit=38')
          .then(res => {
            setProvince(res.data.data);

          })
      } catch (error) {
        toast.error('Fetch Province data error');
        console.error(error)
      } finally {
        setIsLoadingProvince(false);
      }
    }
    fetchUser();
    fetchAddresses();
    fetchOptionvValueProvince();
  }, []);

  // useEffect(()=>{
  //   if (!selectedAddressId) {
  //     setForm({
  //       userId,
  //       receiverName: '',
  //       detail: '',
  //       city: '',
  //       district: '',
  //       province: '',
  //       postalCode: '',
  //       phoneNumber: '',
  //     });
  //     return;
  //   }
  // }, [selectedAddressId])


  useEffect(() => {
    const initFormAndDropdown = async () => {
      if (!selectedAddress) {
        // Reset everything
        setForm({
          userId,
          receiverName: '',
          detail: '',
          city: '',
          district: '',
          province: '',
          postalCode: '',
          phoneNumber: '',
        });
        setSelectedProvinsi(null);
        setSelectedProvinsiId(null);
        setSelectedCity(null);
        setSelectedCityId(null);
        setSelectedDisctrict(null);
        setSelectedDisctrictId(null);
        setCity([]);
        setDistrict([]);
        return;
      }

      // Set form values
      setForm({
        userId,
        receiverName: selectedAddress.receiverName,
        detail: selectedAddress.detail,
        city: selectedAddress.city,
        district: selectedAddress.district,
        province: selectedAddress.province,
        postalCode: selectedAddress.postalCode,
        phoneNumber: selectedAddress.phoneNumber,
      });

      // Get kode provinsi
      const kodeProvinsi = getKodeByNama(province, selectedAddress.province);
      if (!kodeProvinsi) return;

      setSelectedProvinsi(selectedAddress.province);
      setSelectedProvinsiId(kodeProvinsi);

      // Fetch city berdasarkan provinsi
      try {
        setIsLoadingCity(true);
        const cityRes = await axios.get(`https://api.nusakita.yuefii.site/v2/${kodeProvinsi}/kab-kota?pagination=false`);
        const cities = cityRes.data.data;
        setCity(cities);

        const kodeCity = getKodeByNama(cities, selectedAddress.city);
        if (!kodeCity) return;

        setSelectedCity(selectedAddress.city);
        setSelectedCityId(kodeCity);

        // Fetch district berdasarkan city
        setIsLoadingDistrict(true);
        const districtRes = await axios.get(`https://api.nusakita.yuefii.site/v2/${kodeCity}/kecamatan?pagination=false`);
        const districts = districtRes.data.data;
        setDistrict(districts);

        const kodeDistrict = getKodeByNama(districts, selectedAddress.district);
        setSelectedDisctrict(selectedAddress.district);
        setSelectedDisctrictId(kodeDistrict);
      } catch (err) {
        console.error('Gagal load data lokasi:', err);
      } finally {
        setIsLoadingCity(false);
        setIsLoadingDistrict(false);
      }
    };

    initFormAndDropdown();
  }, [selectedAddressId]);


  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      userId: userId
    }));
  }, [userId]);

  // when provinsi selected
  useEffect(() => {
    if (selectedProvinsi) {
      setIsLoadingCity(true);

      axios.get(`https://api.nusakita.yuefii.site/v2/${selectedProvinsiId}/kab-kota?pagination=false`)
        .then(res => {
          setCity(res.data.data);
          setSelectedCityId(null);
          setDistrict([]);
        })
        .catch((error) => {
          toast.error('Gagal Mengambil data kota')
          console.error('error mengambil data kota  : ', error);
        })
        .finally(() => setIsLoadingCity(false));

    }
  }, [selectedProvinsi])

  useEffect(() => {
    if (selectedCity) {
      setIsLoadingDistrict(true);

      axios.get(`https://api.nusakita.yuefii.site/v2/${selectedCityId}/kecamatan?pagination=false`)
        .then(res => {
          setDistrict(res.data.data);
          setSelectedDisctrictId(null);
        })
        .catch((error) => {
          toast.error('Gagal Mengambil data district')
          console.error('error mengambil data disctrict  : ', error);
        })
        .finally(() => setIsLoadingDistrict(false));

    }
  }, [selectedCity])

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const selectedAddress = addresses.find(addr => addr.addressId === selectedAddressId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedAddressId) {

        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address/${selectedAddressId}`, form, {
          withCredentials: true,
        });

        toast.success('Updated successfully');
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address/create`, form, {
          withCredentials: true,
        });
        toast.success('New address created successfully')
      }


    } catch (error: any) {
      console.error(`Failed to save address: ${error.message}`);
    } finally {
      await fetchAddresses();
      setSelectedAddressId(null);
      setSelectedProvinsi(null);
      setSelectedProvinsiId(null);
      setSelectedCity(null);
      setSelectedCityId(null);
      setSelectedDisctrict(null);
      setSelectedDisctrictId(null);
      setForm({
        userId: userId,
        receiverName: '',
        detail: '',
        city: '',
        district: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
      });
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    // const confirmDelete = confirm("Are you sure you want to delete this address?");
    const confirmDelete = await showConfirmationAlert({
      title: "Remove this Address?",
      text: "Are you sure want to remove this address ?"
    })
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address/${addressId}`, {
        withCredentials: true,
      });
      setAddresses(prev => prev.filter(addr => addr.addressId !== addressId));
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
      }
      toast.success('Deleted Successfully')
      await fetchAddresses();
    } catch (error) {
      console.error("Failed to delete address", error);
      alert("Failed to delete address. Please try again.");
    } finally {

    }
  };

  return (
    <main className={`main-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
      <Toaster />
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Address</h2>
        <div className="">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Address Form - Kiri */}
            <div className="bg-card p-10 rounded-xl w-full lg:w-1/2 max-w-xl color-palette-1">
              <p className="text-2xl font-semibold mb-4">
                {selectedAddressId ? 'Update Address' : 'Add Address'}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 text-lg font-medium">Receiver Name</label>
                  <input
                    type="text"
                    className="input input-bordered rounded-md w-full"
                    value={form?.receiverName}
                    onChange={(e) => handleChange('receiverName', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-lg font-medium">Phone Number</label>
                  <input
                    type="text"
                    className="input input-bordered rounded-md w-full"
                    value={form?.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-lg font-medium">Detail</label>
                  <input
                    type="text"
                    className="input input-bordered rounded-md w-full"
                    value={form?.detail}
                    onChange={(e) => handleChange('detail', e.target.value)}
                  />
                </div>
                {/* === Province Dropdown === */}
                <div className="mb-4">
                  <label className="block mb-1 text-lg font-medium">Province</label>
                  <select
                    className="input input-bordered rounded-md w-full"
                    value={selectedProvinsiId ?? ''}
                    disabled={isLoadingProvince}
                    onChange={(e) => {
                      const select = e.target;
                      const nama = select.options[select.selectedIndex].getAttribute('data-nama') || '';
                      const kode = select.value;

                      setSelectedProvinsi(nama);
                      setSelectedProvinsiId(kode);
                      setSelectedCity(null);
                      setSelectedCityId(null);
                      setSelectedDisctrict(null);
                      setSelectedDisctrictId(null);
                      setCity([]);
                      setDistrict([]);
                      handleChange('province', nama);
                    }}
                  >
                    <option value="">
                      {isLoadingProvince ? 'Get Province...' : 'Choose Province'}
                    </option>
                    {province.map((p) => (
                      <option key={p.kode} value={p.kode} data-nama={p.nama}>
                        {p.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* === City Dropdown === */}
                <div className="mb-4">
                  <label className="block mb-1 text-lg font-medium">City</label>
                  <select
                    className="input input-bordered rounded-md w-full"
                    value={selectedCityId ?? ''}
                    disabled={!selectedProvinsiId || isLoadingCity}
                    onChange={(e) => {
                      const select = e.target;
                      const nama = select.options[select.selectedIndex].getAttribute('data-nama') || '';
                      const kode = select.value;

                      setSelectedCity(nama);
                      setSelectedCityId(kode);
                      setSelectedDisctrict(null);
                      setSelectedDisctrictId(null);
                      setDistrict([]);
                      handleChange('city', nama);
                    }}
                  >
                    <option value="">
                      {isLoadingCity ? 'Get City...' : 'Choose City'}
                    </option>
                    {city.map((k) => (
                      <option key={k.kode} value={k.kode} data-nama={k.nama}>
                        {k.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* === District Dropdown === */}
                <div className="mb-4">
                  <label className="block mb-1 text-lg font-medium">District</label>
                  <select
                    className="input input-bordered rounded-md w-full"
                    value={selectedDisctrictId ?? ''}
                    disabled={!selectedCityId || isLoadingDistrict}
                    onChange={(e) => {
                      const select = e.target;
                      const nama = select.options[select.selectedIndex].getAttribute('data-nama') || '';
                      const kode = select.value;

                      setSelectedDisctrict(nama);
                      setSelectedDisctrictId(kode);
                      handleChange('district', nama);
                    }}
                  >
                    <option value="">
                      {isLoadingDistrict ? 'Get District...' : 'Choose District'}
                    </option>
                    {district.map((d) => (
                      <option key={d.kode} value={d.kode} data-nama={d.nama}>
                        {d.nama}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="mb-4">
                  <label className="block mb-1 text-lg font-medium">Postal Code</label>
                  <input
                    type="text"
                    className="input input-bordered rounded-md w-full"
                    value={form?.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-save w-full fw-medium text-lg text-white rounded-pill">
                  {selectedAddressId ? 'Update Address' : 'Save Address'}
                </button>
              </form>
            </div>

            {/* Address list */}
            <div className="mt-10 color-palette-1">
              <p className="text-2xl font-semibold mb-4">Select Address</p>
              <div className="grid gap-4 overflow-y-auto max-h-[600px] pr-2">
                {addresses.map((address) => (
                  <div
                    key={address.addressId}
                    onClick={() => handleSelectAddress(address.addressId)}
                    className={`relative cursor-pointer border p-3 rounded-lg transition ${selectedAddressId === address.addressId ? 'border-[#493628] bg-[#f8f5f2]' : 'border-gray-300'
                      }`}
                  >
                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(address.addressId);
                      }}
                      className="absolute top-2 right-2 text-[#493628] hover:text-[#D6C0B3] text-2xl"
                      title="Delete Address"
                    >
                      <HiX />
                    </button>

                    <p className="font-semibold text-lg">{address.receiverName}</p>
                    <p className="text-base">{address.detail}, {address.district} ,{address.city}, {address.province}</p>
                    <p className="text-base">{address.postalCode}</p>
                    <p className="text-base">Phone: {address.phoneNumber}</p>
                  </div>
                ))}
                {/* Button to indicate empty form */}
                <button
                  type="button"
                  onClick={() => setSelectedAddressId(null)}
                  className={`flex items-center gap-3 bg-[#493628] text-white font-medium !rounded-full py-3 px-4 justify-center hover:bg-[#705C53] transition ${selectedAddressId === null ? 'hover:bg-[#705C53] bg-[#493628] text-white' : 'hover:bg-[#705C53] bg-[#493628] text-white'}`}
                >
                  <MdAddHomeWork className="text-xl font-bold" />
                  <span>Add New Address</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}