import { useState } from 'react';
import { TextField } from './TextField';
import { RadioButtonField } from './RadioButtonField';
import type { RadioOption } from './RadioButtonField';
import { CheckboxField } from './CheckboxField';
import type { CheckboxOption } from './CheckboxField';

/**
 * Componente de ejemplo que muestra cómo usar los componentes de encuesta
 */
export const EncuestaExample = () => {
    // Estados para TextField
    const [textValue, setTextValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');

    // Estados para RadioButtonField
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [selectedSatisfaction, setSelectedSatisfaction] = useState<string | null>(null);

    // Estados para CheckboxField
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    // Opciones para RadioButton
    const genderOptions: RadioOption[] = [
        { value: 'male', label: 'Masculino' },
        { value: 'female', label: 'Femenino' },
        { value: 'other', label: 'Otro' },
        { value: 'prefer-not-say', label: 'Prefiero no decir' }
    ];

    const satisfactionOptions: RadioOption[] = [
        {
            value: 'very-satisfied',
            label: 'Muy satisfecho',
            helperText: 'Superó todas mis expectativas'
        },
        {
            value: 'satisfied',
            label: 'Satisfecho',
            helperText: 'Cumplió con mis expectativas'
        },
        {
            value: 'neutral',
            label: 'Neutral',
            helperText: 'Ni satisfecho ni insatisfecho'
        },
        {
            value: 'dissatisfied',
            label: 'Insatisfecho',
            helperText: 'No cumplió con mis expectativas'
        },
        {
            value: 'very-dissatisfied',
            label: 'Muy insatisfecho',
            helperText: 'Muy por debajo de mis expectativas'
        }
    ];

    // Opciones para Checkbox
    const interestOptions: CheckboxOption[] = [
        {
            value: 'programming',
            label: 'Programación',
            helperText: 'Desarrollo de software y aplicaciones'
        },
        {
            value: 'design',
            label: 'Diseño',
            helperText: 'UI/UX y diseño gráfico'
        },
        {
            value: 'data-science',
            label: 'Ciencia de Datos',
            helperText: 'Análisis y visualización de datos'
        },
        {
            value: 'ai',
            label: 'Inteligencia Artificial',
            helperText: 'Machine Learning y Deep Learning'
        },
        {
            value: 'cybersecurity',
            label: 'Ciberseguridad',
            helperText: 'Seguridad informática y ethical hacking'
        }
    ];

    const dayOptions: CheckboxOption[] = [
        { value: 'monday', label: 'Lunes' },
        { value: 'tuesday', label: 'Martes' },
        { value: 'wednesday', label: 'Miércoles' },
        { value: 'thursday', label: 'Jueves' },
        { value: 'friday', label: 'Viernes' },
        { value: 'saturday', label: 'Sábado' },
        { value: 'sunday', label: 'Domingo' }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-6">
                Ejemplo de Componentes de Encuesta
            </h1>

            {/* Sección TextField */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">TextField</h2>

                <TextField
                    label="Nombre completo"
                    value={textValue}
                    onChange={setTextValue}
                    placeholder="Ingresa tu nombre completo"
                    required
                    helperText="Ingresa tu nombre tal como aparece en tu documento de identidad"
                />

                <TextField
                    label="Cuéntanos sobre ti"
                    value={textareaValue}
                    onChange={setTextareaValue}
                    placeholder="Escribe una breve descripción..."
                    rows={5}
                    resizable
                    showWordCount
                    maxWords={100}
                    maxLength={500}
                    helperText="Comparte un poco sobre tu experiencia y objetivos"
                />
            </section>

            {/* Sección RadioButtonField */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">RadioButtonField (Opción única)</h2>

                <RadioButtonField
                    label="Género"
                    value={selectedGender}
                    onChange={setSelectedGender}
                    options={genderOptions}
                    required
                    orientation="horizontal"
                />

                <RadioButtonField
                    label="¿Qué tan satisfecho estás con el servicio?"
                    value={selectedSatisfaction}
                    onChange={setSelectedSatisfaction}
                    options={satisfactionOptions}
                    required
                    helperText="Selecciona la opción que mejor describa tu experiencia"
                    orientation="vertical"
                />
            </section>

            {/* Sección CheckboxField */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">CheckboxField (Opción múltiple)</h2>

                <CheckboxField
                    label="¿Cuáles son tus áreas de interés?"
                    value={selectedInterests}
                    onChange={setSelectedInterests}
                    options={interestOptions}
                    required
                    minSelections={1}
                    maxSelections={3}
                    helperText="Selecciona entre 1 y 3 áreas de tu interés"
                    orientation="vertical"
                />

                <CheckboxField
                    label="¿Qué días de la semana estás disponible?"
                    value={selectedDays}
                    onChange={setSelectedDays}
                    options={dayOptions}
                    required
                    minSelections={2}
                    helperText="Selecciona al menos 2 días"
                    orientation="horizontal"
                />
            </section>

            {/* Resumen de valores seleccionados */}
            <section className="mt-8 p-6 rounded-lg bg-gray-100 dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4">Valores seleccionados:</h3>
                <div className="space-y-2 text-sm">
                    <p><strong>Nombre:</strong> {textValue || '(vacío)'}</p>
                    <p><strong>Descripción:</strong> {textareaValue || '(vacío)'}</p>
                    <p><strong>Género:</strong> {selectedGender || '(no seleccionado)'}</p>
                    <p><strong>Satisfacción:</strong> {selectedSatisfaction || '(no seleccionado)'}</p>
                    <p><strong>Intereses:</strong> {selectedInterests.length > 0 ? selectedInterests.join(', ') : '(ninguno)'}</p>
                    <p><strong>Días disponibles:</strong> {selectedDays.length > 0 ? selectedDays.join(', ') : '(ninguno)'}</p>
                </div>
            </section>
        </div>
    );
};
