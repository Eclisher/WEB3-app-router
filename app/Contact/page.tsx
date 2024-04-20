"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod";
import './Contact.css'

export default function Contact() {
    // Définir le schéma de validation avec zod
    const schema = zod.object({
        name: zod.string().min(1, "Le nom est requis."),
        email: zod.string().email("Adresse e-mail invalide."),
        phone: zod.string()
            .regex(/^\+261 \d{2} \d{3} \d{2}$/, "Numéro de téléphone invalide. Format attendu : +261 XX XXX XX"),
        message: zod.string().min(5, "Le message doit contenir au moins 5 caractères."),
    });

    // Initialiser le formulaire avec react-hook-form et le validateur zod
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    // Fonction de soumission du formulaire
    const onSubmit = (data) => {
        // Les données du formulaire sont validées ici
        console.log("Données du formulaire validées :", data);
    };

    return (
            <main className="main">
                <div className="mb-6 flex gap-3 sm:items-center">
                    <h2 className="text-2xl font-semibold text-black dark:text-white">
                        Contact
                    </h2>
                </div>
                <div className="rounded-sm border">
                    <div className="border-b px-6 py-4">
                        <h3 className="font-medium text-black dark:text-white">
                            Formulaire de contact
                        </h3>
                    </div>
                    <form className="flex flex-col gap-10 p-10" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Nom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nom"
                                className="input-field"
                                {...register("name")}
                            />
                            {errors.name && <span className="error-message">{errors.name.message}</span>}
                        </div>
                        <div>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input-field"
                                {...register("email")}
                            />
                            {errors.email && <span className="error-message">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Téléphone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Numéro de téléphone"
                                className="input-field"
                                {...register("phone")}
                            />
                            {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                        </div>
                        <div>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                placeholder="Message"
                                className="input-field"
                                {...register("message")}
                            ></textarea>
                            {errors.message && <span className="error-message">{errors.message.message}</span>}
                        </div>
                        <button
                            type="submit"
                            className="button"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
            </main>
        );
        
}
