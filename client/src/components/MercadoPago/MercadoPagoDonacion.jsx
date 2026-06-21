import axios from "axios";
import Swal from 'sweetalert2';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";

const MercadoPagoDonacion = () => {
    const [preferenceId, setPreferenceId] = useState(null);
    const [amount, setAmount] = useState(0);

    initMercadoPago("TEST-24713d63-1517-4b72-8bcc-06cb6b589ced", { locale: "es-AR" });

    const createPreference = async (amount) => {
        try {
            const response = await axios.post("http://localhost:3001/pagos/create_preference", {
                title: "Donación Fundación Callejeritos",
                quantity: 1,
                unit_price: Number(amount),
            });
            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const handleDonate = async (e) => {
        if (amount > 1000) {
            const id = await createPreference(amount);
            if (id) {
                setPreferenceId(id);
            }
        } else {
            Swal.fire({
                title: "Puede donar a partir de $1000",
                icon: "warning",
                confirmButtonColor: "#f69a0b",
                confirmButtonText: "Aceptar"
            })
        }
    };

    return (
        <section>
            <input
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                type="number"
                min={1000}
                step={500}
                className='rounded-full shadow-md p-2'
            />
            <button onClick={handleDonate} className="menu-btn">Donar</button>
            {preferenceId && (
                <Wallet initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { valueProp: "smart_option" } }}
                />
            )}
        </section>
    );
};

export default MercadoPagoDonacion;
