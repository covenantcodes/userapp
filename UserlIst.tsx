import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import COLORS from "./configs/colors";

// Define types for User data and component state
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserWithVisibility extends User {
  showDetails: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserWithVisibility[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data from the API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      const usersWithVisibility = response.data.map((user) => ({
        ...user,
        showDetails: false,
      }));
      setUsers(usersWithVisibility);
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle visibility for user details
  const toggleDetails = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, showDetails: !user.showDetails } : user
      )
    );
  };

  // Render each user item
  const renderItem = ({ item }: { item: UserWithVisibility }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.name}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleDetails(item.id)}
      >
        <Text>{item.showDetails ? "Hide Details" : "Show Details"}</Text>
      </TouchableOpacity>
      {item.showDetails && (
        <View style={styles.userDetails}>
          <Text style={styles.bodyText}>Email: {item.email}</Text>
          <Text style={styles.bodyText}>Phone: {item.phone}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color={COLORS.messageBadge} />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  userContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  userName: {
    fontSize: 18,
    fontFamily: "PoppinsMedium",
  },
  userDetails: {
    marginTop: 8,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontFamily: "PoppinsMedium",
  },

  button: {
    borderRadius: 12,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: COLORS.primaryColor,
  },

  bodyText: {
    fontFamily: "PoppinsRegular",
  },
});

export default UserList;
