import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
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
        if (amount > 0) { 
            const id = await createPreference(amount);
            if (id) {
                setPreferenceId(id);
            }
        } else {
            console.log("El monto debe ser mayor a 0");
        }
    };

    return (
        <section className="h-60 grid border border-secondary rounded-xl mx-10 mt-20">
            <div className="flex items-center justify-center gap-10">
                <input
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))} // Convertir el valor a un número.
                    type="number"
                    className='rounded-full shadow-md p-2'
                />
                <button onClick={handleDonate} className="menu-btn">Donar</button>
                {preferenceId && (
                    <Wallet initialization={{ preferenceId: preferenceId }}
                        customization={{ texts: { valueProp: "smart_option" } }}
                    />
                )}
            </div>
        </section>
    );
};

export default MercadoPagoDonacion;
