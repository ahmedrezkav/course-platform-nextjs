import type { SessionUser } from "@/lib/session-user";

// In-memory students for the simulated sign-in. Passwords stay in this list
// and are never sealed into the cookie. A restart drops everyone except the
// seed student; a cookie already issued still opens until it expires.

type Student = SessionUser & {
  password: string;
};

const demoStudent: Student = {
  id: "user_amira",
  name: "Amira Hassan",
  email: "amira@vela.example",
  password: "vela-demo",
};

const students: Student[] = [demoStudent];

export function demoCredentials() {
  return { email: demoStudent.email, password: demoStudent.password };
}

export function authenticate(email: string, password: string): SessionUser | null {
  const student = students.find((candidate) => candidate.email === email);
  if (!student || student.password !== password) return null;
  return { id: student.id, name: student.name, email: student.email };
}

export function registerStudent(input: {
  name: string;
  email: string;
  password: string;
}): SessionUser | null {
  if (students.some((student) => student.email === input.email)) return null;

  const student: Student = { id: crypto.randomUUID(), ...input };
  students.push(student);
  return { id: student.id, name: student.name, email: student.email };
}
