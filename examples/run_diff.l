@Engine("sqlite");
@Recursive(N, 100, iterative: true);
N() = 0;
N() = N() + 1;