import { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaPlus,
  FaHistory,
  FaCheck,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import styled from "styled-components";
export default function PaymentWithdrawal() {
  // const [activeTab, setActiveTab] = useState("request");
  const [activeTab, setActiveTab] = useState("request");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [requests, setRequests] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // In a real app, this would come from your API
    setBalance(1842.75);

    setRequests([
      {
        id: "PR-2023-001",
        date: "2023-10-15",
        amount: 850.0,
        method: "Bank Transfer",
        status: "paid",
        transactionId: "TX-789456123",
      },
      {
        id: "PR-2023-002",
        date: "2023-10-08",
        amount: 1200.5,
        method: "MTN momo",
        status: "pending",
        transactionId: null,
      },
      {
        id: "PR-2023-003",
        date: "2023-10-01",
        amount: 650.25,
        method: "bank transfer",
        status: "rejected",
        transactionId: null,
      },
      {
        id: "PR-2023-004",
        date: "2023-09-25",
        amount: 1420.0,
        method: "At cash",
        status: "paid",
        transactionId: "TX-321654987",
      },
    ]);
  }, [setRequests]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > balance) {
      setError("Requested amount exceeds available balance");
      return;
    }

    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setRequests([
        {
          id: `PR-2023-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString().split("T")[0],
          amount: parseFloat(amount),
          method:
            paymentMethod === "bank"
              ? "Bank Transfer"
              : paymentMethod === "paypal"
              ? "PayPal"
              : "Stripe",
          status: "pending",
          transactionId: null,
        },
        ...requests,
      ]);

      setBalance((prev) => prev - parseFloat(amount));
      setAmount("");
      setError("");
      setLoading(false);
    }, 1000);
  };

  return (
    <Container>
      <Header>
        <Title>
          <FaMoneyBillWave /> Payment Requests
        </Title>
        <Balance>
          Available Balance: <Amount>${balance.toFixed(2)}</Amount>
        </Balance>
      </Header>
      <Tabs>
        <TabButton
          $active={activeTab === "request"}
          onClick={() => setActiveTab("request")}
        >
          <FaPlus /> Request Payment
        </TabButton>
        <TabButton
          $active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        >
          <FaHistory /> Payment History
        </TabButton>
      </Tabs>
      {activeTab === "request" ? (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Amount to Withdraw</Label>
              <InputGroup>
                <Currency>$</Currency>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  step="0.01"
                  min="1"
                  max={balance}
                />
              </InputGroup>
              <MaxAmount onClick={() => setAmount(balance.toFixed(2))}>
                Withdraw maximum: ${balance.toFixed(2)}
              </MaxAmount>
            </FormGroup>

            <FormGroup>
              <Label>Payment Method</Label>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
              </Select>
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Request Payment"}
            </SubmitButton>

            <InfoBox>
              <InfoTitle>Payment Processing Information</InfoTitle>
              <InfoText>
                • Minimum withdrawal amount: $10
                <br />
                • Processing time: 3-5 business days
                <br />
                • Service fee: 1.5% per transaction
                <br />• Payments are processed on weekdays only
              </InfoText>
            </InfoBox>
          </Form>
        </FormContainer>
      ) : (
        <HistoryContainer>
          {requests.length === 0 ? (
            <EmptyState>
              <EmptyIcon />
              <EmptyText>No payment requests found</EmptyText>
              <EmptySubtext>Your payment history will appear here</EmptySubtext>
            </EmptyState>
          ) : (
            <RequestList>
              {requests.map((request) => (
                <RequestItem key={request.id}>
                  <RequestHeader>
                    <RequestId>#{request.id}</RequestId>
                    <RequestDate>{request.date}</RequestDate>
                    <RequestStatus $status={request.status}>
                      {request.status === "paid" && <FaCheck />}
                      {request.status === "pending" && <FaClock />}
                      {request.status === "rejected" && <FaTimes />}
                      {request.status}
                    </RequestStatus>
                  </RequestHeader>

                  <RequestDetails>
                    <Detail>
                      <DetailLabel>Amount:</DetailLabel>
                      <DetailValue>${request.amount.toFixed(2)}</DetailValue>
                    </Detail>
                    <Detail>
                      <DetailLabel>Method:</DetailLabel>
                      <DetailValue>{request.method}</DetailValue>
                    </Detail>
                    {request.transactionId && (
                      <Detail>
                        <DetailLabel>Transaction ID:</DetailLabel>
                        <DetailValue>{request.transactionId}</DetailValue>
                      </Detail>
                    )}
                  </RequestDetails>

                  {request.status === "rejected" && (
                    <RejectionReason>
                      <ReasonLabel>Reason:</ReasonLabel>
                      <ReasonText>
                        Bank account information incomplete
                      </ReasonText>
                    </RejectionReason>
                  )}
                </RequestItem>
              ))}
            </RequestList>
          )}
        </HistoryContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
`;

const Balance = styled.div`
  font-size: 1.25rem;
  color: #7f8c8d;
`;

const Amount = styled.span`
  font-weight: 700;
  color: #27ae60;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: ${(props) => (props.$active ? "#3498db" : "#f8f9fa")};
  color: ${(props) => (props.$active ? "white" : "#2c3e50")};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#2980b9" : "#e9ecef")};
  }
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 8px;
  overflow: hidden;
`;

const Currency = styled.span`
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  color: #495057;
  font-weight: 600;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: none;
  font-size: 1.1rem;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const MaxAmount = styled.div`
  margin-top: 0.5rem;
  color: #3498db;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #2980b9;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const ErrorMessage = styled.div`
  padding: 0.75rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover {
    background: #219653;
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const InfoBox = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
`;

const InfoTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const InfoText = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0;
`;

const HistoryContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdc3c7;
  font-size: 2rem;
`;

const EmptyText = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const EmptySubtext = styled.p`
  color: #7f8c8d;
  margin-bottom: 1.5rem;
`;

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RequestItem = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f8f9fa;
`;

const RequestId = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

const RequestDate = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const RequestStatus = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;

  background-color: ${(props) =>
    props.$status === "paid"
      ? "rgba(39, 174, 96, 0.1)"
      : props.$status === "pending"
      ? "rgba(241, 196, 15, 0.1)"
      : "rgba(231, 76, 60, 0.1)"};

  color: ${(props) =>
    props.$status === "paid"
      ? "#27ae60"
      : props.$status === "pending"
      ? "#f39c12"
      : "#e74c3c"};
`;

const RequestDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

const RejectionReason = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8d7da;
  border-radius: 6px;
`;

const ReasonLabel = styled.span`
  font-weight: 600;
  color: #721c24;
  margin-right: 0.5rem;
`;

const ReasonText = styled.span`
  color: #721c24;
`;
