import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to Cyblick ("we," "our," or "us"). This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website and use our 
              AI-powered website generation service.
            </p>
            <p className="text-muted-foreground">
              Cyblick is committed to protecting your privacy and ensuring you have a positive 
              experience on our platform. We believe in transparency and want you to understand 
              how we handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
            <p className="text-muted-foreground mb-4">
              When you register for Cyblick, we collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Email address</li>
              <li>Full name</li>
              <li>Profile information (optional)</li>
              <li>Payment information (processed securely by Stripe)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">Usage Data</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Websites you create and modify</li>
              <li>Chat conversations with our AI</li>
              <li>Token usage and subscription information</li>
              <li>Feature usage analytics</li>
              <li>Performance and error logs</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Provide our service:</strong> Generate websites, manage your account, and process payments</li>
              <li><strong>Improve our platform:</strong> Analyze usage patterns to enhance features and performance</li>
              <li><strong>Communicate with you:</strong> Send important updates, security alerts, and support responses</li>
              <li><strong>Ensure security:</strong> Protect against fraud, abuse, and unauthorized access</li>
              <li><strong>Comply with legal requirements:</strong> Meet regulatory and legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell your personal information. We may share your information in these limited circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Service Providers:</strong> Third-party services that help us operate Cyblick (Supabase, Stripe, analytics providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of Cyblick, our users, or others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and authorization</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and employee training</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Export your data in a common format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us at privacy@cyblick.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your information for as long as necessary to provide our services and comply 
              with legal obligations. When you delete your account, we will delete your personal 
              information within 30 days, except for information we're required to retain by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. International Data Transfers</h2>
            <p className="text-muted-foreground">
              Cyblick is based in the United States. If you're located outside the US, your 
              information may be transferred to and processed in the US. We ensure appropriate 
              safeguards are in place for international data transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Cyblick is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13. If you believe a child has provided us with 
              personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any 
              material changes by posting the new Privacy Policy on this page and updating the 
              "Last updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-card p-6 rounded-lg border">
              <p className="text-foreground font-semibold mb-2">Cyblick Privacy Team</p>
              <p className="text-muted-foreground">Email: privacy@cyblick.com</p>
              <p className="text-muted-foreground">Address: [Your Business Address]</p>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;