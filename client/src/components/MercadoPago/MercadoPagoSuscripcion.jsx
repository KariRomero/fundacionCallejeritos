import { useState } from 'react';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const MercadoPagoSuscripcion = () => {
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [preferenceId, setPreferenceId] = useState(null);

    // Inicializa Mercado Pago
    initMercadoPago("TEST-24713d63-1517-4b72-8bcc-06cb6b589ced", { locale: "es-AR" });

    const createSuscripcion = async () => {
        try {
            const amount = Number(selectedAmount || customAmount);
            const frequency = Number(selectedPlan);
    
            const response = await axios.post("http://localhost:3001/pagos/create_suscripcion", {
                title: `Suscripción por ${frequency} meses a Fundación Callejeritos`,
                unit_price: amount,
                frequency: frequency,
                frequency_type: "month",
                quantity: 1
            });             
            const { id } = response.data;
            return id;    
        } catch (error) {
            console.error("Error creando la suscripción:", error.response ? error.response.data : error.message);
        }
    };
    

    const handleSuscription = async () => {
        const amount = Number(selectedAmount || customAmount);
        if (amount > 0 && selectedPlan) {
            const id = await createSuscripcion();
            if (id) {
                setPreferenceId(id);
            }
        } else {
            console.log("Debes seleccionar un monto y un plan");
        }
    };

    const handleAmountChange = (value) => {
        setSelectedAmount(value);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (event) => {
        setCustomAmount(event.target.value);
        setSelectedAmount('');
    };

    const handlePlanChange = (value) => {
        setSelectedPlan(value);
    };

    return (
        <section className="h-60 grid border border-secondary rounded-xl mx-10 mt-20">
            <div className="flex items-center justify-center gap-10">
                <div>
                    <label> $3000 </label>
                    <input
                        type="radio"
                        name="amount"
                        checked={selectedAmount === "3000"}
                        onChange={() => handleAmountChange("3000")}
                    />
                </div>

                <div>
                    <label> $5000 </label>
                    <input
                        type="radio"
                        name="amount"
                        checked={selectedAmount === "5000"}
                        onChange={() => handleAmountChange("5000")}
                    />
                </div>

                <div>
                    <label> $10.000 </label>
                    <input
                        type="radio"
                        name="amount"
                        checked={selectedAmount === "10000"}
                        onChange={() => handleAmountChange("10000")}
                    />
                </div>

                <div>
                    <label> Otro </label>
                    <input
                        type="number"
                        name="customAmount"
                        min="0.00"
                        step="500"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className='rounded-full shadow-md p-2'
                    />
                </div>
            </div>
            <div className="flex items-center justify-center gap-10">
                <div>
                    <label> 3 meses </label>
                    <input
                        type="radio"
                        name="plan"
                        checked={selectedPlan === "3"}
                        onChange={() => handlePlanChange("3")}
                    />
                </div>

                <div>
                    <label> 6 meses </label>
                    <input
                        type="radio"
                        name="plan"
                        checked={selectedPlan === "6"}
                        onChange={() => handlePlanChange("6")}
                    />
                </div>

                <div>
                    <label> Anual </label>
                    <input
                        type="radio"
                        name="plan"
                        checked={selectedPlan === "12"}
                        onChange={() => handlePlanChange("12")}
                    />
                </div>
            </div>
            <button className="menu-btn" onClick={handleSuscription}>Suscribirme</button>
            {preferenceId && (
                <Wallet initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { valueProp: "smart_option" } }}
                />
            )}
        </section>
    );
};

export default MercadoPagoSuscripcion;
