import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { registerProductRequest } from "../api/auth";

// Función de validación para Formik
const validate = (values: { name: string; description: string; price: string }) => {
  const errors: { name?: string; description?: string; price?: string } = {};

  if (!values.name) {
    errors.name = "El nombre es requerido";
  }

  if (!values.description) {
    errors.description = "La descripción es requerida";
  }

  // Validación de precio
  if (!values.price) {
    errors.price = "El precio es requerido";
  } else if (isNaN(Number(values.price)) || Number(values.price) <= 0) {
    errors.price = "El precio debe ser un número válido mayor que cero";
  }

  return errors;
};

const AddProductForm = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Usamos useNavigate para la redirección

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Agregar Producto</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <Formik
        initialValues={{ name: "", description: "", price: "" }}
        validate={validate}
        onSubmit={async (values, { resetForm }) => {
          try {
            const priceValue = parseFloat(values.price);
            await registerProductRequest(values.name, values.description, priceValue);
            setSuccess("Producto agregado con éxito");
            resetForm(); // Limpiar el formulario después de un envío exitoso
            setError(null);
            navigate("/home"); // Redirigir a la página /home después de agregar el producto
          } catch (err) {
            setError("Error al agregar el producto");
            setSuccess(null);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700">Nombre</label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Descripción</label>
              <Field
                as="textarea"
                name="description"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Precio</label>
              <Field
                type="text"
                name="price"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cargando..." : "Agregar Producto"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
