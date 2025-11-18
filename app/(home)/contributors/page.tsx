import Link from "next/link";

const CONTRIBUTORS = [
  {
    "name": "Qiuyang Mang",
    "link": "https://joyemang33.github.io/",
    "role": "Co-Lead"
  },
  {
    "name": "Wenhao Chai",
    "link": "https://wenhaochai.com/",
    "role": "Co-Lead"
  },
  {
    "name": "Huanzhi Mao",
    "link": "https://huanzhimao.com/",
    "role": "Co-Lead"
  },
  {
    "name": "Zhifei Li",
    "link": "",
    "role": "Co-Lead"
  },
  {
    "name": "Shang Zhou",
    "link": "https://shangzhou.me/",
    "role": "Co-Lead"
  },
  {
    "name": "Alexander Du",
    "link": "",
    "role": "Co-Lead"
  },
  {
    "name": "Hanchen Li",
    "link": "",
    "role": "Co-Lead"
  },
  {
    "name": "Shu Liu",
    "link": "",
    "role": "Co-Lead"
  },
  {
    "name": "Edwin Chen",
    "link": "https://blog.echen.me/",
    "role": "Contributor"
  },
  {
    "name": "Yichuan Wang",
    "link": "https://yichuan-w.github.io/",
    "role": "Contributor"
  },
  {
    "name": "Xieting Chu",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Zerui Cheng",
    "link": "https://www.zerui-cheng.com/",
    "role": "Contributor"
  },
  {
    "name": "Yuan Xu",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Tian Xia",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Zirui Wang",
    "link": "https://zwcolin.github.io/",
    "role": "Contributor"
  },
  {
    "name": "Tianneng Shi",
    "link": "https://tnshi.com/",
    "role": "Contributor"
  },
  {
    "name": "Jianzhu Yao",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Zeyu Shen",
    "link": "https://sites.google.com/view/zeyu-shen",
    "role": "Contributor"
  },
  {
    "name": "Zihan Zheng",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Kaiyuan Liu",
    "link": "https://kaiyuanliu04.github.io/",
    "role": "Contributor"
  },
  {
    "name": "Dong Xing",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Zerui Li",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Zirong Zeng",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Yige Jiang",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Lufeng Cheng",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Ziyi Zhao",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Youran Sun",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Wesley Zheng",
    "link": "https://wesleyzheng.me/",
    "role": "Contributor"
  },
  {
    "name": "Meiyuwang Zhang",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Ruyi Ji",
    "link": "http://www.jiry17.site/",
    "role": "Contributor"
  },
  {
    "name": "Xuechang Tu",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Runyuan He",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Zexing Chen",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Kangyang Zhou",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Zhaozi Wang",
    "link": "",
    "role": "Contributor"
  },
  {
    "name": "Jingbang Chen",
    "link": "https://chenjb.com/",
    "role": "Contributor"
  },
  {
    "name": "Aleksandra Korolova",
    "link": "https://www.korolova.com/",
    "role": "Advisor"
  },
  {
    "name": "Peter Henderson",
    "link": "https://www.peterhenderson.co/",
    "role": "Advisor"
  },
  {
    "name": "Pramod Viswanath",
    "link": "https://ece.princeton.edu/people/pramod-viswanath",
    "role": "Advisor"
  },
  {
    "name": "Vijay Ganesh",
    "link": "https://vganesh1.github.io/",
    "role": "Advisor"
  },
  {
    "name": "Saining Xie",
    "link": "https://www.sainingxie.com/",
    "role": "Advisor"
  },
  {
    "name": "Zhuang Liu",
    "link": "https://liuzhuang13.github.io/",
    "role": "Advisor"
  },
  {
    "name": "Dawn Song",
    "link": "https://dawnsong.io/",
    "role": "Advisor"
  },
  {
    "name": "Sewon Min",
    "link": "https://www.sewonmin.com/",
    "role": "Advisor"
  },
  {
    "name": "Joseph E. Gonzalez",
    "link": "https://people.eecs.berkeley.edu/~jegonzal/",
    "role": "Advisor"
  },
  {
    "name": "Ion Stoica",
    "link": "https://people.eecs.berkeley.edu/~istoica/",
    "role": "Advisor"
  },
  {
    "name": "Jingbo Shang",
    "link": "https://shangjingbo1226.github.io/",
    "role": "Advisor"
  },
  {
    "name": "Alvin Cheung",
    "link": "https://people.eecs.berkeley.edu/~akcheung/",
    "role": "Advisor"
  }
];

export default function TeamPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6 sm:pt-12">
      <div className="flex w-full max-w-7xl flex-1 flex-col">
        <h2 className="mb-6 font-mono text-4xl tracking-tighter sm:mb-12">
          Contributors
        </h2>
        {/* <p className="text-muted-foreground mb-12 font-mono text-base/relaxed sm:text-base/relaxed">
          We're looking for more contributors! If you are interested in
          collaborating please see our{" "}
          <Link
            href="/docs/contributing"
            className="text-foreground underline underline-offset-4"
          >
            contributing page
          </Link>
          .
        </p> */}
        <div className="-mx-4 grid grid-cols-1 items-stretch sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {CONTRIBUTORS.map(({ name, link, role }, index) => (
            <Link href={link} key={name} className="flex flex-col">
              <div className="bg-card hover:bg-sidebar dark:hover:bg-accent -mb-px flex-1 border-y p-4 transition-all duration-200 sm:-mr-px sm:border-x">
                <p className="mb-1 font-mono text-lg">{name}</p>
                <p className="text-muted-foreground font-mono text-xs">
                  {role}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-col sm:mt-12">
          <h2 className="mb-6 font-mono text-2xl tracking-tighter">
            Acknowledgements
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground font-mono text-sm/relaxed">
              We thank Ce Jin, Mingrui Liu, Youliang Yuan, and Qingyu Shi for valuable discussions and feedback on the benchmark's design and evaluation.
            </p>
            {/* <p className="text-muted-foreground font-mono text-sm/relaxed">
              TODO: Acknowledgements
            </p>
            <p className="text-muted-foreground font-mono text-sm/relaxed">
              TODO: Acknowledgements
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
