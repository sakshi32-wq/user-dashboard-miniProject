import { Modal, TextInput, Button, Stack, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { User } from "../api/api";
import { useEffect } from "react";

interface UserModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (user: Omit<User, "id">) => void;
  mode: "add" | "edit";
  initialData?: User;
}

type UserFormValues = Omit<User, "id">;

export default function SameComponent({
  opened,
  onClose,
  onSubmit,
  mode,
  initialData,
}: UserModalProps) {
  const form = useForm<UserFormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      company: { name: "" },
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      },
    },

    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.name.trim()) errors["name"] = "Name is required";
      if (!/^\S+@\S+\.\S+$/.test(values.email))
        errors["email"] = "Invalid email address";
      if (!values.phone.trim()) errors["phone"] = "Phone is required";
      if (!values.website.trim()) errors["website"] = "Website is required";

      if (!values.company.name.trim())
        errors["company.name"] = "Company name is required";

      if (!values.address.street.trim())
        errors["address.street"] = "Street is required";
      if (!values.address.suite.trim())
        errors["address.suite"] = "Suite is required";
      if (!values.address.city.trim())
        errors["address.city"] = "City is required";
      if (!values.address.zipcode.trim())
        errors["address.zipcode"] = "Zipcode is required";

      return errors;
    },
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.setValues(initialData);
    } else {
      form.reset();
    }
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={mode === "add" ? "Add User" : "Edit User"}
      styles={{
        title: {
          color: "#ae3ec9",
          fontWeight: 700,
          textAlign: "center",
          width: "100%",
          fontSize: "24px",
        },
        header: {
          justifyContent: "center",
        },
      }}
      size="lg"
      radius="lg"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
          onClose();
        })}
      >
        <Stack>
          <TextInput label="Name" {...form.getInputProps("name")} />
          <TextInput label="Email" {...form.getInputProps("email")} />
          <TextInput label="Phone" {...form.getInputProps("phone")} />
          <TextInput label="Website" {...form.getInputProps("website")} />
          <TextInput
            label="Company Name"
            {...form.getInputProps("company.name")}
          />
          <Text fw={600}>Address:</Text>
          <TextInput label="Street" {...form.getInputProps("address.street")} />
          <TextInput label="Suite" {...form.getInputProps("address.suite")} />
          <TextInput label="City" {...form.getInputProps("address.city")} />
          <TextInput
            label="Zipcode"
            {...form.getInputProps("address.zipcode")}
          />

          <Group justify="center" mt="md">
            <Button type="submit" color="grape" w={"100%"}>
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
