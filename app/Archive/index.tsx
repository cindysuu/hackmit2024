import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React = require("react");
import { Text, View } from "react-native";
import { useAuth, useUser } from '@clerk/clerk-expo';

export default function Index() {
  const tasks = useQuery(api.tasks.get);
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  if (isSignedIn) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{JSON.stringify(user)}</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tasks?.map(({ _id, text }) => <Text key={_id}>{text}</Text>)}
    </View>
  );
}